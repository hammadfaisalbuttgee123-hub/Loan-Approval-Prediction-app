'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function PredictPage() {
  const [formData, setFormData] = useState({
    Gender: 'Male',
    Married: 'No',
    Dependents: '0',
    Education: 'Graduate',
    Self_Employed: 'No',
    ApplicantIncome: '',
    CoapplicantIncome: '0',
    LoanAmount: '',
    Loan_Amount_Term: '360',
    Credit_History: '1.0',
    Property_Area: 'Urban',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: string; probability: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ...formData,
        ApplicantIncome: Number(formData.ApplicantIncome),
        CoapplicantIncome: Number(formData.CoapplicantIncome),
        LoanAmount: Number(formData.LoanAmount),
        Loan_Amount_Term: Number(formData.Loan_Amount_Term),
        Credit_History: Number(formData.Credit_History),
      };

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setResult(data);

      // Save to localStorage
      const newPrediction = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...formData,
        prediction: data.prediction,
        probability: data.probability,
      };

      const existing = localStorage.getItem('loanPredictions');
      const predictions = existing ? JSON.parse(existing) : [];
      predictions.unshift(newPrediction); // add to top
      localStorage.setItem('loanPredictions', JSON.stringify(predictions));

    } catch (err) {
      console.error(err);
      setError('Could not connect to the prediction server. Make sure the backend is running at http://localhost:8000.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setFormData({
      Gender: 'Male',
      Married: 'No',
      Dependents: '0',
      Education: 'Graduate',
      Self_Employed: 'No',
      ApplicantIncome: '',
      CoapplicantIncome: '0',
      LoanAmount: '',
      Loan_Amount_Term: '360',
      Credit_History: '1.0',
      Property_Area: 'Urban',
    });
  };

  const selectStyle = "mt-1.5 block w-full pl-3.5 pr-10 py-2.5 text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all";
  const inputWithPrefixStyle = "block w-full pl-8 pr-4 py-2.5 text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 placeholder:text-gray-400 transition-all";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Real-Time Assessment
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
            Loan Eligibility Checker
          </h1>
          <p className="mt-2 text-base text-gray-600 max-w-xl mx-auto">
            Fill in your details below to get an instant AI prediction powered by K-Nearest Neighbors
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-xl shadow-sm"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-red-800">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 18, stiffness: 200 }}
              className={`p-8 sm:p-12 rounded-3xl shadow-2xl text-center transform transition-all border-2 ${
                result.prediction === 'Approved' 
                  ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-green-300 shadow-green-100/50' 
                  : 'bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-red-300 shadow-red-100/50'
              }`}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.15 }}
                className={`mx-auto flex items-center justify-center h-24 w-24 rounded-full mb-6 ${
                  result.prediction === 'Approved' 
                    ? 'bg-green-100 text-green-700 ring-8 ring-green-200/50' 
                    : 'bg-red-100 text-red-700 ring-8 ring-red-200/50'
                }`}
              >
                {result.prediction === 'Approved' ? (
                  <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>

              <h2 className={`text-4xl font-extrabold mb-3 tracking-tight ${
                result.prediction === 'Approved' ? 'text-green-900' : 'text-red-900'
              }`}>
                Loan {result.prediction}!
              </h2>
              
              <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base mb-6">
                {result.prediction === 'Approved' 
                  ? 'Congratulations! Your profile strongly aligns with historically approved loans.' 
                  : 'Based on your parameters, the model indicates higher credit risk. Review details below.'}
              </p>

              <div className="max-w-md mx-auto mt-4 mb-8 bg-white/80 p-5 rounded-2xl shadow-sm border border-gray-200/60 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-2.5">
                  <span className="text-sm font-bold text-gray-700">Model Confidence</span>
                  <span className="text-2xl font-black text-gray-900">{(result.probability * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${result.probability * 100}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${
                      result.prediction === 'Approved' ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-rose-500 to-red-600'
                    }`}
                  ></motion.div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={resetForm}
                  className="w-full sm:w-auto px-8 py-3.5 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                  Try Another Prediction
                </motion.button>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/history"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 border border-gray-300 text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
                  >
                    View History &rarr;
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleSubmit} 
              className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              {/* Section 1: Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-5 border-b border-gray-100 pb-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="Gender" className="block text-sm font-semibold text-gray-700">Gender</label>
                    <select id="Gender" name="Gender" value={formData.Gender} onChange={handleChange} className={selectStyle}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="Married" className="block text-sm font-semibold text-gray-700">Married</label>
                    <select id="Married" name="Married" value={formData.Married} onChange={handleChange} className={selectStyle}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="Dependents" className="block text-sm font-semibold text-gray-700">Dependents</label>
                    <select id="Dependents" name="Dependents" value={formData.Dependents} onChange={handleChange} className={selectStyle}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="Education" className="block text-sm font-semibold text-gray-700">Education</label>
                    <select id="Education" name="Education" value={formData.Education} onChange={handleChange} className={selectStyle}>
                      <option value="Graduate">Graduate</option>
                      <option value="Not Graduate">Not Graduate</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="Self_Employed" className="block text-sm font-semibold text-gray-700">Self Employed</label>
                    <select id="Self_Employed" name="Self_Employed" value={formData.Self_Employed} onChange={handleChange} className={selectStyle}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Financial Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-5 border-b border-gray-100 pb-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ApplicantIncome" className="block text-sm font-semibold text-gray-700">Applicant Income</label>
                    <div className="mt-1.5 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        name="ApplicantIncome" 
                        id="ApplicantIncome" 
                        required 
                        placeholder="e.g. 5000" 
                        min="0" 
                        value={formData.ApplicantIncome} 
                        onChange={handleChange} 
                        className={inputWithPrefixStyle} 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="CoapplicantIncome" className="block text-sm font-semibold text-gray-700">Coapplicant Income</label>
                    <div className="mt-1.5 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        name="CoapplicantIncome" 
                        id="CoapplicantIncome" 
                        required 
                        placeholder="e.g. 2000" 
                        min="0" 
                        value={formData.CoapplicantIncome} 
                        onChange={handleChange} 
                        className={inputWithPrefixStyle} 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="LoanAmount" className="block text-sm font-semibold text-gray-700">Loan Amount (in thousands)</label>
                    <div className="mt-1.5 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold sm:text-sm">$</span>
                      </div>
                      <input 
                        type="number" 
                        name="LoanAmount" 
                        id="LoanAmount" 
                        required 
                        placeholder="e.g. 150" 
                        min="0" 
                        value={formData.LoanAmount} 
                        onChange={handleChange} 
                        className={inputWithPrefixStyle} 
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1.5 block">Enter amount in thousands (e.g. 150 for $150,000)</span>
                  </div>
                  <div>
                    <label htmlFor="Loan_Amount_Term" className="block text-sm font-semibold text-gray-700">Loan Amount Term (months)</label>
                    <select id="Loan_Amount_Term" name="Loan_Amount_Term" value={formData.Loan_Amount_Term} onChange={handleChange} className={selectStyle}>
                      {[36, 60, 84, 120, 180, 240, 300, 360, 480].map(term => (
                        <option key={term} value={term}>{term} months ({term / 12} years)</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Credit & Property */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-5 border-b border-gray-100 pb-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Credit & Property
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="Credit_History" className="block text-sm font-semibold text-gray-700">Credit History</label>
                    <select id="Credit_History" name="Credit_History" value={formData.Credit_History} onChange={handleChange} className={selectStyle}>
                      <option value="1.0">✅ Good (Meets Guidelines)</option>
                      <option value="0.0">❌ Poor (Does Not Meet Guidelines)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="Property_Area" className="block text-sm font-semibold text-gray-700">Property Area</label>
                    <select id="Property_Area" name="Property_Area" value={formData.Property_Area} onChange={handleChange} className={selectStyle}>
                      <option value="Urban">Urban</option>
                      <option value="Semiurban">Semiurban</option>
                      <option value="Rural">Rural</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Evaluating Application...
                    </span>
                  ) : (
                    'Predict Loan Status'
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
