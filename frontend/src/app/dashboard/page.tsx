'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const kChartData = [
  { k: 1, val: 72.91, width: '72.91%' },
  { k: 2, val: 70.27, width: '70.27%' },
  { k: 3, val: 78.19, width: '78.19%' },
  { k: 4, val: 76.17, width: '76.17%' },
  { k: 5, val: 79.01, width: '79.01%' },
  { k: 6, val: 76.78, width: '76.78%' },
  { k: 7, val: 79.83, width: '79.83%' },
  { k: 8, val: 78.61, width: '78.61%' },
  { k: 9, val: 79.83, width: '79.83%' },
  { k: 10, val: 79.23, width: '79.23%' },
  { k: 11, val: 79.83, width: '79.83%' },
  { k: 12, val: 79.83, width: '79.83%' },
  { k: 13, val: 80.04, width: '80.04%' },
  { k: 14, val: 80.24, width: '80.24%', best: true },
  { k: 17, val: 79.83, width: '79.83%' },
  { k: 20, val: 80.04, width: '80.04%' },
];

export default function DashboardPage() {
  const [selectedK, setSelectedK] = useState<number>(14);
  const [hoveredMatrixCell, setHoveredMatrixCell] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Live Evaluation Metrics
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Model Performance Dashboard</h1>
            <p className="text-gray-600 mt-1 text-base">Comprehensive metrics, cross-validation tuning, and confusion matrix analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/predict"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Test Model &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Section 1: Animated Key Metrics */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all border border-blue-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Test Accuracy</p>
              <span className="p-1.5 bg-blue-500/40 rounded-lg text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">79.67%</h2>
            <p className="text-blue-200 text-xs mt-2 font-medium">Evaluated on 123 holdout test samples</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all border border-indigo-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">CV Score (5-fold)</p>
              <span className="p-1.5 bg-indigo-500/40 rounded-lg text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">80.24%</h2>
            <p className="text-indigo-200 text-xs mt-2 font-medium">GridSearchCV cross-validation mean</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-100 text-xs font-bold uppercase tracking-wider">Optimal Parameter</p>
              <span className="p-1.5 bg-purple-500/40 rounded-lg text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">K = 14</h2>
            <p className="text-purple-200 text-xs mt-2 font-medium">14 Nearest Neighbors voting</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-lg hover:shadow-xl p-6 text-white transition-all border border-emerald-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Dataset Records</p>
              <span className="p-1.5 bg-emerald-500/40 rounded-lg text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">614</h2>
            <p className="text-emerald-200 text-xs mt-2 font-medium">11 features across all applicants</p>
          </motion.div>
        </motion.section>

        {/* Section 2: Animated Graph - Cross-Validation Accuracy vs. K Value */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping"></span>
                Cross-Validation Accuracy vs. Number of Neighbors (K)
              </h3>
              <p className="text-gray-500 text-sm mt-1">Interactive comparison of model accuracy as K varies from 1 to 20</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 border border-yellow-300 rounded-full text-xs font-bold text-yellow-800">
                ⭐ K=14 is Optimal (80.24%)
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {kChartData.map((item, index) => {
              const isSelected = selectedK === item.k;
              return (
                <div 
                  key={item.k} 
                  onClick={() => setSelectedK(item.k)}
                  className={`group flex items-center cursor-pointer p-1.5 rounded-xl transition-all duration-200 ${
                    isSelected ? 'bg-indigo-50/80 ring-1 ring-indigo-300' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-14 text-xs font-bold text-right pr-3 transition-colors ${isSelected ? 'text-indigo-700' : 'text-gray-600'}`}>
                    K = {item.k}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden shadow-inner flex items-center">
                    {/* Animated growing bar */}
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: item.width }}
                      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
                      className={`h-full rounded-full flex items-center justify-end pr-3.5 text-xs font-extrabold text-white shadow-sm transition-all ${
                        item.best 
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 ring-2 ring-yellow-400' 
                          : isSelected 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                            : 'bg-gradient-to-r from-blue-400 to-blue-500 group-hover:from-blue-500 group-hover:to-indigo-500'
                      }`}
                    >
                      {item.val}%
                    </motion.div>
                  </div>
                  {item.best && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                      className="ml-3 hidden sm:inline-flex items-center text-xs font-extrabold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full"
                    >
                      BEST
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
            <span>💡 Click on any row to highlight that neighbor parameter.</span>
            <span>GridSearchCV 5-Fold Stratified Cross-Validation</span>
          </div>
        </motion.section>

        {/* Section 3: Confusion Matrix & Classification Report */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Animated Confusion Matrix */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Confusion Matrix (K=14)</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-semibold">123 Test Samples</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Hover over any quadrant to inspect classification details.</p>
              
              <div className="relative">
                {/* Top Headers */}
                <div className="flex ml-16 mb-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex-1">Pred Rejected (0)</div>
                  <div className="flex-1">Pred Approved (1)</div>
                </div>
                
                <div className="flex">
                  {/* Left Headers */}
                  <div className="w-16 flex flex-col justify-between py-8 text-xs font-bold text-gray-500 text-center uppercase tracking-wider">
                    <div className="flex-1 flex items-center justify-center">Actual Rejected</div>
                    <div className="flex-1 flex items-center justify-center">Actual Approved</div>
                  </div>
                  
                  {/* 2x2 Animated Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-3.5">
                    {/* True Negative */}
                    <motion.div 
                      whileHover={{ scale: 1.04 }}
                      onMouseEnter={() => setHoveredMatrixCell('TN')}
                      onMouseLeave={() => setHoveredMatrixCell(null)}
                      className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 flex flex-col items-center justify-center min-h-[125px] text-center shadow-sm cursor-pointer transition-all hover:border-blue-400 hover:shadow-md"
                    >
                      <span className="text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">True Negative (TN)</span>
                      <span className="text-4xl font-black text-blue-900">18</span>
                      <span className="text-blue-600 text-xs font-semibold mt-1">Correctly Rejected</span>
                    </motion.div>
                    
                    {/* False Positive */}
                    <motion.div 
                      whileHover={{ scale: 1.04 }}
                      onMouseEnter={() => setHoveredMatrixCell('FP')}
                      onMouseLeave={() => setHoveredMatrixCell(null)}
                      className="bg-rose-50 border-2 border-rose-200 rounded-xl p-5 flex flex-col items-center justify-center min-h-[125px] text-center shadow-sm cursor-pointer transition-all hover:border-rose-400 hover:shadow-md"
                    >
                      <span className="text-rose-800 text-xs font-bold uppercase tracking-wider mb-1">False Positive (FP)</span>
                      <span className="text-4xl font-black text-rose-900">25</span>
                      <span className="text-rose-600 text-xs font-semibold mt-1">Incorrectly Approved</span>
                    </motion.div>
                    
                    {/* False Negative */}
                    <motion.div 
                      whileHover={{ scale: 1.04 }}
                      onMouseEnter={() => setHoveredMatrixCell('FN')}
                      onMouseLeave={() => setHoveredMatrixCell(null)}
                      className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 flex flex-col items-center justify-center min-h-[125px] text-center shadow-sm cursor-pointer transition-all hover:border-emerald-400 hover:shadow-md"
                    >
                      <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">False Negative (FN)</span>
                      <span className="text-4xl font-black text-emerald-900">0</span>
                      <span className="text-emerald-600 text-xs font-semibold mt-1">0 Missed Approvals!</span>
                    </motion.div>
                    
                    {/* True Positive */}
                    <motion.div 
                      whileHover={{ scale: 1.04 }}
                      onMouseEnter={() => setHoveredMatrixCell('TP')}
                      onMouseLeave={() => setHoveredMatrixCell(null)}
                      className="bg-gradient-to-br from-indigo-700 to-blue-800 border-2 border-indigo-900 rounded-xl p-5 flex flex-col items-center justify-center min-h-[125px] text-center shadow-md cursor-pointer transition-all hover:shadow-lg"
                    >
                      <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">True Positive (TP)</span>
                      <span className="text-4xl font-black text-white">80</span>
                      <span className="text-indigo-200 text-xs font-semibold mt-1">Correctly Approved</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              {hoveredMatrixCell === 'TN' && <p className="text-blue-700 font-medium">True Negative: 18 high-risk applications were accurately flagged for rejection.</p>}
              {hoveredMatrixCell === 'FP' && <p className="text-rose-700 font-medium">False Positive: 25 rejected cases were predicted as approved (model leans toward approval).</p>}
              {hoveredMatrixCell === 'FN' && <p className="text-emerald-700 font-medium">False Negative: 0 applications were denied approval wrongly. Perfect 100% recall.</p>}
              {hoveredMatrixCell === 'TP' && <p className="text-indigo-700 font-medium">True Positive: 80 eligible applications received real-time approval.</p>}
              {!hoveredMatrixCell && <p>Total accurate predictions: <span className="font-bold text-gray-800">98 / 123 (79.67%)</span></p>}
            </div>
          </motion.div>

          {/* Classification Report Table */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Classification Report</h3>
              <p className="text-sm text-gray-500 mb-6">Detailed breakdown of precision, recall, and harmonic f1-scores</p>
              
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-gray-600 uppercase text-xs">Class</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-600 uppercase text-xs">Precision</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-600 uppercase text-xs">Recall</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-600 uppercase text-xs">F1-Score</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-600 uppercase text-xs">Support</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-gray-900">Rejected (N)</td>
                      <td className="px-4 py-3.5 text-center font-bold text-emerald-600">1.00</td>
                      <td className="px-4 py-3.5 text-center font-bold text-amber-600">0.42</td>
                      <td className="px-4 py-3.5 text-center font-semibold text-gray-700">0.59</td>
                      <td className="px-4 py-3.5 text-center text-gray-500 font-medium">43</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-gray-900">Approved (Y)</td>
                      <td className="px-4 py-3.5 text-center font-bold text-indigo-600">0.76</td>
                      <td className="px-4 py-3.5 text-center font-bold text-emerald-600">1.00</td>
                      <td className="px-4 py-3.5 text-center font-semibold text-gray-700">0.86</td>
                      <td className="px-4 py-3.5 text-center text-gray-500 font-medium">80</td>
                    </tr>
                    <tr className="bg-gray-50 font-bold border-t-2 border-gray-200">
                      <td className="px-4 py-3.5 text-gray-900">Weighted Avg</td>
                      <td className="px-4 py-3.5 text-center text-gray-900">0.85</td>
                      <td className="px-4 py-3.5 text-center text-gray-900">0.80</td>
                      <td className="px-4 py-3.5 text-center text-gray-900">0.77</td>
                      <td className="px-4 py-3.5 text-center text-gray-900">123</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
              <span className="font-bold">Key takeaway:</span> Precision for Rejected is <span className="font-extrabold text-indigo-700">1.00</span>, meaning whenever the model determines an application should be rejected, it is 100% correct according to ground-truth labels.
            </div>
          </motion.div>
        </section>

        {/* Section 4: Features & Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feature Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Model Features</h3>
              <p className="text-sm text-gray-500 mb-6">11 standardized features utilized in Euclidean distance calculation</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Categorical Features (Encoded)</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Credit_History', 'Property_Area'].map((feat) => (
                      <motion.span 
                        key={feat}
                        whileHover={{ scale: 1.08 }}
                        className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200 shadow-sm cursor-default"
                      >
                        {feat}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Numerical Features (Standardized)</h4>
                  <div className="flex flex-wrap gap-2">
                    {['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term'].map((feat) => (
                      <motion.span 
                        key={feat}
                        whileHover={{ scale: 1.08 }}
                        className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 shadow-sm cursor-default"
                      >
                        {feat}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100">
              Normalized using StandardScaler to guarantee zero mean and unit variance.
            </p>
          </motion.div>

          {/* Model Insights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Key Model Insights</h3>
              <p className="text-sm text-gray-500 mb-6">Behavioral dynamics discovered during evaluation</p>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-indigo-100 shadow-sm flex items-start gap-3 transition-transform"
                >
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Perfect Precision for Rejections</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      Precision is 1.00. No qualified loan applicant was erroneously rejected.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6 }}
                  className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50/60 rounded-xl border border-emerald-100 shadow-sm flex items-start gap-3 transition-transform"
                >
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Full Recall on Approvals</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      Recall is 1.00 for class Y. Every applicant who should have received approval was approved.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6 }}
                  className="p-4 bg-gradient-to-r from-rose-50 to-pink-50/60 rounded-xl border border-rose-100 shadow-sm flex items-start gap-3 transition-transform"
                >
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Credit History Dominance</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      Credit_History = 1.0 is the single most influential determinant of positive loan outcome.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-right">
              <Link href="/about" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                Read dataset & methodology details &rarr;
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
