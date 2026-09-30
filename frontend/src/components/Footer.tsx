import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                LoanPredict
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Empowering financial decisions through advanced machine learning. Get instant, accurate loan approval predictions to streamline your application process.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/predict" className="hover:text-white transition-colors">
                  Predict
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span>Next.js 16 (App Router)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span>FastAPI Backend</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span>scikit-learn (KNN)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span>Tailwind CSS v4</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 LoanPredict. Built with KNN Machine Learning.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
