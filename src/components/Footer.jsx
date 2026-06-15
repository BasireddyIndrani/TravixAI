import React from "react"
import { Link } from "react-router-dom"
import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-borderLight bg-appCard py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-1.5 rounded-md text-white">
                <Shield size={16} />
              </div>
              <span className="text-lg font-bold font-outfit text-primary">
                Travix <span className="text-secondary">AI</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              India's First AI-Powered Predictive Mobility Safety & Journey Protection Platform. 
              Bridging the gap between ride booking and route protection for every daily commuter.
            </p>
            <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">
              Presented By <span className="text-secondary font-bold font-outfit text-xs">Team SafeHer</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-secondary transition">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/start-journey" className="text-gray-600 dark:text-gray-400 hover:text-secondary transition">
                  AI Guardian (Start Route)
                </Link>
              </li>
              <li>
                <Link to="/heatmap" className="text-gray-600 dark:text-gray-400 hover:text-secondary transition">
                  Safety Heatmap
                </Link>
              </li>
              <li>
                <Link to="/sos" className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition font-medium">
                  Voice-Free SOS Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Hackathon Info</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/team" className="text-gray-600 dark:text-gray-400 hover:text-secondary transition">
                  Team SafeHer Members
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-600 dark:text-gray-400 hover:text-secondary transition">
                  Strategic Future Roadmap
                </Link>
              </li>
              <li className="text-gray-500 italic">
                Round 2 MVP Commute Safety
              </li>
              <li className="text-gray-500 text-[10px]">
                Reimagining Urban Mobility & Daily Commute in India 2026
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-borderLight flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500">
          <p>&copy; {new Date().getFullYear()} Travix AI. Designed & Built for Mobility & Commute Safety India Hackathon 2026.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>React MVP Prototype</span>
            <span>Local Storage Active</span>
            <span>No Data Uploaded</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
