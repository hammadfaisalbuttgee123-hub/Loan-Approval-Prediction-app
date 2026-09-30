"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface PredictionRecord {
  id: string;
  date: string;
  Gender: string;
  Married: string;
  Dependents: string;
  Education: string;
  Self_Employed: string;
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: number;
  Property_Area: string;
  prediction: "Approved" | "Rejected";
  probability: number;
}

export default function HistoryPage() {
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("loanPredictions");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        parsed.sort((a: PredictionRecord, b: PredictionRecord) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPredictions(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all prediction history?")) {
      localStorage.removeItem("loanPredictions");
      setPredictions([]);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-5"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Prediction History</h1>
          <p className="text-gray-500 mt-1">Review previously submitted loan applications and model outcomes</p>
        </div>
        
        {predictions.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              {predictions.length} Record{predictions.length !== 1 ? 's' : ''}
            </span>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-lg transition-colors font-bold border border-red-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </motion.button>
          </div>
        )}
      </motion.div>

      {predictions.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-md flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No past predictions stored</h2>
          <p className="text-gray-500 mb-6 max-w-md text-sm">
            You haven't checked any loan applications yet on this device. Run a prediction to see your saved results here.
          </p>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link 
              href="/predict" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              Check Loan Eligibility
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {predictions.map((record, index) => {
            const isApproved = record.prediction === "Approved";
            const isExpanded = expandedId === record.id;
            
            return (
              <motion.div 
                key={record.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-gray-300"
              >
                {/* Header (Clickable) */}
                <div 
                  className="p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-gray-50/60"
                  onClick={() => toggleExpand(record.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${isApproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isApproved ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                        Loan {record.prediction}
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {(record.probability * 100).toFixed(1)}% Confidence
                        </span>
                      </h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1 gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(record.date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-xs font-semibold text-gray-400 hidden sm:inline">
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </span>
                    <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-gray-100">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Animated Accordion Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="border-t border-gray-100 bg-slate-50/70 p-6 overflow-hidden"
                    >
                      <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Application Parameters</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <DetailItem label="Applicant Income" value={`$${record.ApplicantIncome.toLocaleString()}`} />
                        <DetailItem label="Coapplicant Income" value={`$${record.CoapplicantIncome.toLocaleString()}`} />
                        <DetailItem label="Loan Amount" value={`$${(record.LoanAmount * 1000).toLocaleString()}`} />
                        <DetailItem label="Loan Term" value={`${record.Loan_Amount_Term} months (${record.Loan_Amount_Term / 12} yrs)`} />
                        
                        <DetailItem label="Credit History" value={record.Credit_History === 1 ? 'Good (1.0)' : 'Poor (0.0)'} />
                        <DetailItem label="Gender" value={record.Gender} />
                        <DetailItem label="Married" value={record.Married} />
                        <DetailItem label="Dependents" value={record.Dependents} />
                        
                        <DetailItem label="Education" value={record.Education} />
                        <DetailItem label="Self Employed" value={record.Self_Employed} />
                        <DetailItem label="Property Area" value={record.Property_Area} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
      <p className="text-xs text-gray-400 font-semibold">{label}</p>
      <p className="text-sm text-gray-900 font-bold mt-0.5">{value}</p>
    </div>
  );
}
