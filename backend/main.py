from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import joblib
import numpy as np
import os

# Paths for the model files
def find_model_dir():
    possible_dirs = [
        os.getenv("MODEL_DIR"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "models"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ml_pipeline"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "ml_pipeline"),
        os.path.join(os.getcwd(), "backend", "models"),
        os.path.join(os.getcwd(), "ml_pipeline"),
    ]
    for d in possible_dirs:
        if d and os.path.exists(os.path.join(d, "knn_model.joblib")):
            return d
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ml_pipeline")

MODEL_DIR = find_model_dir()
MODEL_PATH = os.path.join(MODEL_DIR, "knn_model.joblib")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.joblib")
ENCODERS_PATH = os.path.join(MODEL_DIR, "label_encoders.joblib")

# Global model variables
knn_model = None
scaler = None
label_encoders = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML models on startup."""
    global knn_model, scaler, label_encoders
    try:
        if all(os.path.exists(p) for p in [MODEL_PATH, SCALER_PATH, ENCODERS_PATH]):
            knn_model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            label_encoders = joblib.load(ENCODERS_PATH)
            print(f"[OK] Models loaded successfully from {MODEL_DIR}")
        else:
            print(f"[WARN] Model files not found in {MODEL_DIR}. Checked {MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Error loading models: {e}")
    yield


app = FastAPI(title="Loan Approval Prediction API", lifespan=lifespan)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoanApplication(BaseModel):
    Gender: str
    Married: str
    Dependents: str
    Education: str
    Self_Employed: str
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float
    Property_Area: str


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Loan Approval Prediction API",
        "models_loaded": knn_model is not None,
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "models_loaded": knn_model is not None}


@app.post("/predict")
def predict_loan(application: LoanApplication):
    if knn_model is None:
        raise HTTPException(status_code=503, detail="Models not loaded. Run train_knn.py first.")

    try:
        input_data = application.model_dump()

        # Encode categorical features using the saved label encoders
        categorical_features = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area']

        for feature in categorical_features:
            encoder = label_encoders[feature]
            val = str(input_data[feature])
            try:
                input_data[feature] = int(encoder.transform([val])[0])
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid value '{val}' for {feature}. Valid values: {list(encoder.classes_)}"
                )

        # Build feature array in the exact order used during training
        feature_order = [
            'Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',
            'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount',
            'Loan_Amount_Term', 'Credit_History', 'Property_Area'
        ]
        features = np.array([[input_data[f] for f in feature_order]])

        # Scale features
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction_num = int(knn_model.predict(scaled_features)[0])
        prediction_str = "Approved" if prediction_num == 1 else "Rejected"

        # Get probability
        proba = knn_model.predict_proba(scaled_features)[0]
        confidence = float(proba[1]) if prediction_num == 1 else float(proba[0])

        return {
            "prediction": prediction_str,
            "probability": round(confidence, 4)
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
