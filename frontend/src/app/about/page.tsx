'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Activity, 
  Code,
  CheckCircle,
  XCircle,
  Network
} from "lucide-react";

export default function AboutPage() {
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
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. About This Project */}
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
          Architecture & Methodology
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">About LoanPredict</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          A full-stack machine learning web application that predicts loan approval using the K-Nearest Neighbors (KNN) algorithm. 
          Built to demonstrate end-to-end deployment of an ML model with modern Next.js and FastAPI REST architecture.
        </p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 2. The Dataset */}
        <motion.section 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">The Dataset</h2>
          </div>
          <div className="space-y-4 text-gray-600 text-sm">
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-500">Source</span>
              <span className="text-gray-900 font-bold">Loan Prediction Dataset</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-500">Records</span>
              <span className="text-gray-900 font-bold">614 loan applications</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-500">Features</span>
              <span className="text-gray-900 font-bold">11 inputs + 1 target</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-500">Target Variable</span>
              <span className="text-gray-900 font-bold">Loan_Status (Y / N)</span>
            </div>
            
            <div className="mt-6 pt-3">
              <span className="font-bold text-gray-700 block mb-2">Class Distribution</span>
              <div className="flex h-4 rounded-full overflow-hidden bg-gray-100 p-0.5">
                <div className="bg-emerald-500 rounded-l-full w-[68.7%]" title="Approved (68.7%)"></div>
                <div className="bg-rose-500 rounded-r-full w-[31.3%]" title="Rejected (31.3%)"></div>
              </div>
              <div className="flex justify-between mt-2.5 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="w-4 h-4" /> 422 Approved (68.7%)
                </div>
                <div className="flex items-center gap-1.5 text-rose-700">
                  <XCircle className="w-4 h-4" /> 192 Rejected (31.3%)
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. How KNN Works */}
        <motion.section 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-blue-100/80 shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                <Network className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How KNN Works</h2>
            </div>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              K-Nearest Neighbors classifies new loan requests by calculating the <span className="font-bold text-indigo-700">Euclidean distance</span> to all training examples and collecting a majority vote from the <span className="font-bold text-indigo-700">K closest neighbors</span>.
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-blue-100/50 flex justify-center mb-6">
              <div className="relative w-44 h-44 border-2 border-dashed border-indigo-200 rounded-full flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-6 left-10 w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></motion.div>
                <div className="absolute top-14 left-28 w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></div>
                <div className="absolute bottom-12 left-12 w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></div>
                
                <div className="absolute bottom-10 right-10 w-4 h-4 bg-rose-500 rounded-full shadow-sm"></div>
                <div className="absolute top-10 right-8 w-4 h-4 bg-rose-500 rounded-full shadow-sm"></div>
                
                <div className="relative flex flex-col items-center">
                  <div className="w-7 h-7 bg-indigo-600 rounded-full ring-4 ring-indigo-200 animate-pulse"></div>
                  <span className="text-[11px] font-extrabold text-indigo-800 mt-1">Applicant</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 p-4 rounded-xl border border-indigo-100 text-xs text-indigo-900">
            GridSearchCV verified that <span className="font-extrabold text-indigo-700">K=14</span> minimizes variance while optimizing test accuracy at <span className="font-extrabold text-indigo-700">79.67%</span>.
          </div>
        </motion.section>
      </div>

      {/* 4. Methodology */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">7-Step ML Methodology</h2>
            <p className="text-xs text-gray-500">From raw data cleaning to hyperparameter optimization</p>
          </div>
        </div>
        
        <div className="relative border-l-2 border-purple-100 ml-4 space-y-7 pb-2">
          <Step number="1" title="Data Collection" desc="Loaded the loan applicants CSV dataset into memory." />
          <Step number="2" title="Data Cleaning" desc="Imputed 149 missing values with median for numerical columns and mode for categorical features." />
          <Step number="3" title="Feature Engineering" desc="Encoded 6 categorical attributes using LabelEncoder." />
          <Step number="4" title="Data Splitting" desc="Created 80% training set (491 instances) and 20% validation/test set (123 instances)." />
          <Step number="5" title="Feature Scaling" desc="Standardized all continuous features using StandardScaler for scale invariance." />
          <Step number="6" title="GridSearchCV Tuning" desc="Exhaustively tested K from 1 to 20 with 5-fold cross-validation." />
          <Step number="7" title="Final Model Evaluation" desc="Confirmed K=14 yields 79.67% test accuracy and 100% precision on rejections." isLast />
        </div>
      </motion.section>

      {/* 5. Tech Stack */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
            <Code className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <TechCard emoji="🐍" name="Python" role="ML Pipeline & Backend" variants={itemVariants} />
          <TechCard emoji="⚛️" name="Next.js 16" role="App Router Framework" variants={itemVariants} />
          <TechCard emoji="🎨" name="Tailwind CSS v4" role="Utility-First Styling" variants={itemVariants} />
          <TechCard emoji="🚀" name="FastAPI" role="High-Speed REST API" variants={itemVariants} />
          <TechCard emoji="📊" name="scikit-learn" role="KNN & Hyperparameter Search" variants={itemVariants} />
          <TechCard emoji="✨" name="Framer Motion" role="Fluid UI & Graph Animations" variants={itemVariants} />
        </div>
      </motion.section>
    </div>
  );
}

function Step({ number, title, desc, isLast = false }: { number: string; title: string; desc: string; isLast?: boolean }) {
  return (
    <motion.div whileHover={{ x: 5 }} className="relative pl-8 transition-transform">
      <div className="absolute -left-[17px] top-0.5 w-8 h-8 bg-purple-100 border-4 border-white rounded-full flex items-center justify-center text-purple-700 font-extrabold text-xs shadow-xs">
        {number}
      </div>
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TechCard({ emoji, name, role, variants }: { emoji: string; name: string; role: string; variants: any }) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex items-start gap-4"
    >
      <div className="text-3xl">{emoji}</div>
      <div>
        <h3 className="font-extrabold text-gray-900 text-sm">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 font-medium">{role}</p>
      </div>
    </motion.div>
  );
}
