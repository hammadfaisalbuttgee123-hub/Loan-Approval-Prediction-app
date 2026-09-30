import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import json
import os

def main():
    data_path = r"c:\Users\HAMMAD BUTT\Desktop\loan approal app\train_u6lujuX_CVtuZ9i.csv"
    output_dir = r"c:\Users\HAMMAD BUTT\Desktop\loan approal app\ml_pipeline"

    # ================================================================
    # 1. Load the CSV dataset and display the first 5 rows
    # ================================================================
    print("=" * 60)
    print("STEP 1: Loading Dataset")
    print("=" * 60)
    df = pd.read_csv(data_path)
    print(f"\nDataset shape: {df.shape}")
    print(f"\nFirst 5 rows:")
    print(df.head().to_string())
    print(f"\nColumn dtypes:\n{df.dtypes}")

    # ================================================================
    # 2. Check for missing values
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 2: Missing Values Analysis")
    print("=" * 60)
    missing = df.isnull().sum()
    print(f"\nMissing values BEFORE filling:")
    print(missing[missing > 0].to_string())
    print(f"\nTotal missing values: {missing.sum()}")

    # ================================================================
    # 3. Fill missing values
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 3: Filling Missing Values")
    print("=" * 60)

    # Explicitly define column types (pandas 3 uses 'str' dtype, not 'object')
    numerical_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']
    categorical_cols = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area']

    print(f"Numerical columns: {numerical_cols}")
    print(f"Categorical columns: {categorical_cols}")

    # Fill numerical with median (pandas 3 compatible)
    for col in numerical_cols:
        if df[col].isnull().sum() > 0:
            median_val = df[col].median()
            df[col] = df[col].fillna(median_val)
            print(f"  Filled {col} with median: {median_val}")

    # Fill categorical with mode (pandas 3 compatible)
    for col in categorical_cols:
        if df[col].isnull().sum() > 0:
            mode_val = df[col].mode()[0]
            df[col] = df[col].fillna(mode_val)
            print(f"  Filled {col} with mode: {mode_val}")

    missing_after = df.isnull().sum().sum()
    print(f"\nTotal missing values AFTER filling: {missing_after}")

    # ================================================================
    # 4. Encode categorical variables
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 4: Encoding Categorical Variables")
    print("=" * 60)

    cols_to_encode = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
    encoders = {}
    encoder_mappings = {}

    for col in cols_to_encode:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le
        encoder_mappings[col] = [str(c) for c in le.classes_]
        print(f"  {col}: {list(le.classes_)} -> {list(range(len(le.classes_)))}")

    # ================================================================
    # 5. Drop Loan_ID and prepare features/target
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 5: Preparing Features and Target")
    print("=" * 60)

    df = df.drop('Loan_ID', axis=1)
    print("Dropped Loan_ID column.")

    X = df.drop('Loan_Status', axis=1)
    y = df['Loan_Status']
    feature_names = list(X.columns)
    print(f"Features ({len(feature_names)}): {feature_names}")
    print(f"Target distribution:\n{y.value_counts().to_string()}")

    # ================================================================
    # 6. Split 80% train / 20% test
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 6: Train/Test Split (80/20)")
    print("=" * 60)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training set size: {X_train.shape[0]}")
    print(f"Testing set size:  {X_test.shape[0]}")

    # ================================================================
    # 7. Standardize features
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 7: Feature Standardization (StandardScaler)")
    print("=" * 60)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    print("Features standardized successfully.")

    # ================================================================
    # 8. Train KNN with default parameters
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 8: Training KNN (Default K=5)")
    print("=" * 60)

    knn_default = KNeighborsClassifier()
    knn_default.fit(X_train_scaled, y_train)
    y_pred_default = knn_default.predict(X_test_scaled)
    acc_default = accuracy_score(y_test, y_pred_default)
    print(f"Default KNN (K=5) Accuracy: {acc_default:.4f} ({acc_default*100:.2f}%)")

    # ================================================================
    # 9. Experiment with different K values
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 9: Experimenting with Different K Values")
    print("=" * 60)

    k_values = [3, 5, 7, 9, 11]
    k_accuracies = {}
    print(f"\n{'K':>5} | {'Accuracy':>10} | {'Accuracy %':>10}")
    print("-" * 35)

    for k in k_values:
        knn_temp = KNeighborsClassifier(n_neighbors=k)
        knn_temp.fit(X_train_scaled, y_train)
        y_pred_temp = knn_temp.predict(X_test_scaled)
        acc_temp = accuracy_score(y_test, y_pred_temp)
        k_accuracies[k] = acc_temp
        print(f"{k:>5} | {acc_temp:>10.4f} | {acc_temp*100:>9.2f}%")

    best_manual_k = max(k_accuracies, key=k_accuracies.get)
    print(f"\nBest K from manual experiment: K={best_manual_k} with accuracy {k_accuracies[best_manual_k]:.4f}")

    # ================================================================
    # 10. Hyperparameter Tuning with GridSearchCV
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 10: Hyperparameter Tuning (GridSearchCV)")
    print("=" * 60)

    param_grid = {'n_neighbors': list(range(1, 21))}
    knn_grid = GridSearchCV(
        KNeighborsClassifier(),
        param_grid,
        cv=5,
        scoring='accuracy',
        return_train_score=True
    )
    knn_grid.fit(X_train_scaled, y_train)

    best_k = knn_grid.best_params_['n_neighbors']
    best_cv_score = knn_grid.best_score_

    print(f"\nGridSearchCV Results (5-fold CV):")
    print(f"{'K':>5} | {'Mean CV Accuracy':>18}")
    print("-" * 30)
    for k, mean_score in zip(param_grid['n_neighbors'], knn_grid.cv_results_['mean_test_score']):
        marker = " <-- BEST" if k == best_k else ""
        print(f"{k:>5} | {mean_score:>18.4f}{marker}")

    print(f"\nBest K from GridSearchCV: {best_k}")
    print(f"Best Cross-Validation Score: {best_cv_score:.4f}")

    # ================================================================
    # 11. Train Final Model with Best K
    # ================================================================
    print("\n" + "=" * 60)
    print(f"STEP 11: Training Final Model (K={best_k})")
    print("=" * 60)

    final_knn = KNeighborsClassifier(n_neighbors=best_k)
    final_knn.fit(X_train_scaled, y_train)
    y_pred_final = final_knn.predict(X_test_scaled)

    # ================================================================
    # 12. Final Model Evaluation
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 12: Final Model Evaluation")
    print("=" * 60)

    final_acc = accuracy_score(y_test, y_pred_final)
    cm = confusion_matrix(y_test, y_pred_final)
    cr = classification_report(y_test, y_pred_final, target_names=['Rejected (N)', 'Approved (Y)'])

    print(f"\nFinal Model Accuracy: {final_acc:.4f} ({final_acc*100:.2f}%)")
    print(f"\nConfusion Matrix:")
    print(f"                  Predicted")
    print(f"                  Rejected  Approved")
    print(f"Actual Rejected   {cm[0][0]:>6}    {cm[0][1]:>6}")
    print(f"Actual Approved   {cm[1][0]:>6}    {cm[1][1]:>6}")
    print(f"\nClassification Report:")
    print(cr)

    # ================================================================
    # 13. Save Confusion Matrix Plot
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 13: Saving Confusion Matrix Visualization")
    print("=" * 60)

    fig, axes = plt.subplots(1, 2, figsize=(16, 6))

    # Plot 1: Confusion Matrix Heatmap
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=['Rejected', 'Approved'],
                yticklabels=['Rejected', 'Approved'],
                ax=axes[0], cbar_kws={'label': 'Count'})
    axes[0].set_ylabel('Actual', fontsize=12)
    axes[0].set_xlabel('Predicted', fontsize=12)
    axes[0].set_title(f'KNN Confusion Matrix (K={best_k})\nAccuracy: {final_acc:.4f}', fontsize=14)

    # Plot 2: K vs Accuracy (from GridSearchCV)
    all_k = list(range(1, 21))
    all_scores = knn_grid.cv_results_['mean_test_score']
    axes[1].plot(all_k, all_scores, 'b-o', markersize=6, linewidth=2)
    axes[1].axvline(x=best_k, color='r', linestyle='--', label=f'Best K={best_k}')
    axes[1].set_xlabel('Number of Neighbors (K)', fontsize=12)
    axes[1].set_ylabel('Cross-Validation Accuracy', fontsize=12)
    axes[1].set_title('K vs Accuracy (GridSearchCV)', fontsize=14)
    axes[1].set_xticks(all_k)
    axes[1].legend(fontsize=11)
    axes[1].grid(True, alpha=0.3)

    plt.tight_layout()
    cm_path = os.path.join(output_dir, 'confusion_matrix.png')
    plt.savefig(cm_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved confusion matrix plot to: {cm_path}")

    # ================================================================
    # 14. Save Model Artifacts
    # ================================================================
    print("\n" + "=" * 60)
    print("STEP 14: Saving Model Artifacts")
    print("=" * 60)

    model_path = os.path.join(output_dir, 'knn_model.joblib')
    scaler_path = os.path.join(output_dir, 'scaler.joblib')
    le_path = os.path.join(output_dir, 'label_encoders.joblib')

    joblib.dump(final_knn, model_path)
    joblib.dump(scaler, scaler_path)
    joblib.dump(encoders, le_path)

    print(f"  Model saved:          {model_path}")
    print(f"  Scaler saved:         {scaler_path}")
    print(f"  Label encoders saved: {le_path}")

    # ================================================================
    # 15. Save model_info.json
    # ================================================================
    model_info = {
        'feature_names': feature_names,
        'encoder_mappings': encoder_mappings,
        'best_k': int(best_k),
        'accuracy': float(final_acc),
        'best_cv_score': float(best_cv_score)
    }
    json_path = os.path.join(output_dir, 'model_info.json')
    with open(json_path, 'w') as f:
        json.dump(model_info, f, indent=4)
    print(f"  Model info saved:     {json_path}")

    print("\n" + "=" * 60)
    print("PIPELINE EXECUTION COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()
