'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-36">
        <div className="absolute inset-y-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl mix-blend-multiply opacity-70 animate-pulse"></div>
          <div className="absolute top-40 left-0 -ml-40 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply opacity-70 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                Instant Machine Learning Decision
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Predict Your Loan <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Approval in Seconds</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Our AI-powered KNN model analyzes your profile to predict loan eligibility with 80% accuracy. Fast, reliable, and completely data-driven.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <Link 
                    href="/predict" 
                    className="inline-flex justify-center items-center px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/25 transition-all w-full sm:w-auto"
                  >
                    Check Eligibility
                    <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <Link 
                    href="/dashboard" 
                    className="inline-flex justify-center items-center px-8 py-4 rounded-xl text-slate-700 font-bold bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm transition-all w-full sm:w-auto"
                  >
                    View Model Performance
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Graphic with Float Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 mt-16 lg:mt-0 relative hidden md:block"
            >
              <div className="relative w-full h-[480px] flex items-center justify-center">
                <motion.div 
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.65" />
                      </linearGradient>
                      <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>
                    <circle cx="200" cy="200" r="160" fill="url(#grad1)" />
                    <circle cx="250" cy="150" r="90" fill="url(#grad2)" />
                    <circle cx="150" cy="250" r="70" fill="white" opacity="0.15" />
                    
                    {/* Animated Nodes & Connections */}
                    <g stroke="#ffffff" strokeWidth="2.5" opacity="0.75">
                      <line x1="120" y1="180" x2="200" y2="130" />
                      <line x1="200" y1="130" x2="280" y2="160" />
                      <line x1="280" y1="160" x2="250" y2="250" />
                      <line x1="250" y1="250" x2="150" y2="280" />
                      <line x1="150" y1="280" x2="120" y2="180" />
                      <line x1="200" y1="130" x2="250" y2="250" />
                      <line x1="120" y1="180" x2="280" y2="160" />
                    </g>
                    
                    <g fill="#ffffff">
                      <circle cx="120" cy="180" r="6" />
                      <circle cx="200" cy="130" r="8" />
                      <circle cx="280" cy="160" r="7" />
                      <circle cx="250" cy="250" r="9" />
                      <circle cx="150" cy="280" r="6" />
                    </g>

                    {/* Floating Data Badges */}
                    <g>
                      <rect x="50" y="80" width="130" height="42" rx="10" fill="white" opacity="0.95" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                      <text x="68" y="106" fontFamily="sans-serif" fontSize="13" fill="#1e293b" fontWeight="bold">💵 Income Data</text>
                    </g>
                    
                    <g>
                      <rect x="250" y="300" width="130" height="42" rx="10" fill="white" opacity="0.95" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                      <text x="268" y="326" fontFamily="sans-serif" fontSize="13" fill="#1e293b" fontWeight="bold">📈 Credit History</text>
                    </g>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Why Trust Our Model?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Built on solid data science principles to provide you with the most accurate preliminary assessment.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">⚡ Instant Predictions</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Get real-time loan approval predictions powered by machine learning. No waiting, no complex paperwork to get an initial idea.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">📊 Data-Driven</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Trained on 600+ real loan applications with 11 key features including income, credit history, loan amount, and demographics.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">🎯 80% Accuracy</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Optimized KNN model with GridSearchCV hyperparameter tuning ensures highly reliable predictions for your specific profile.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to uncover your loan eligibility</p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 -z-10"></div>
            
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <motion.div whileHover={{ y: -5 }} className="relative">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-blue-50 text-blue-600 text-3xl font-extrabold mb-6 shadow-lg shadow-blue-900/5 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Your Details</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fill in your income, loan amount, credit history and other details in our secure form.
                </p>
              </motion.div>
              
              <motion.div whileHover={{ y: -5 }} className="relative">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-indigo-50 text-indigo-600 text-3xl font-extrabold mb-6 shadow-lg shadow-indigo-900/5 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">AI Analysis</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our KNN model compares your profile against 600+ historical applications in milliseconds.
                </p>
              </motion.div>
              
              <motion.div whileHover={{ y: -5 }} className="relative">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-blue-50 text-blue-600 text-3xl font-extrabold mb-6 shadow-lg shadow-blue-900/5 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Get Results</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Receive instant approval prediction with confidence score and model insights.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Model Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 text-white relative shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20 text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 transition-transform">
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">614</div>
              <div className="text-blue-100 font-semibold text-sm">Training Samples</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 transition-transform">
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">80.24%</div>
              <div className="text-blue-100 font-semibold text-sm">Cross-Validation Accuracy</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 transition-transform">
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">11</div>
              <div className="text-blue-100 font-semibold text-sm">Input Features</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-4 transition-transform">
              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">K = 14</div>
              <div className="text-blue-100 font-semibold text-sm">Optimal Neighbors</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">Ready to Check Your Eligibility?</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">Take the first step towards your loan by getting an instant prediction from our intelligent model.</p>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link 
              href="/predict" 
              className="inline-flex justify-center items-center px-10 py-5 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30 transition-all"
            >
              Start Prediction
              <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
