import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useJourney } from "../context/JourneyContext"
import { motion } from "framer-motion"
import { 
  Shield, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  UserCheck, 
  Navigation,
  ArrowRight,
  ShieldCheck,
  Compass
} from "lucide-react"

export default function Dashboard({ user }) {
  const { activeJourney, overallTrustScore, history, unsafeReports, sosActive } = useJourney()
  const navigate = useNavigate()

  // Calculate some simple mock dashboard parameters
  const lastTrip = history[0] || {}
  const totalTrips = history.length
  const unsafeReportsCount = unsafeReports.length

  // Dynamic Risk Evaluation based on current active journey
  let currentRiskText = "Low Risk"
  let currentRiskColor = "text-emerald-500"
  let currentRiskBg = "bg-emerald-500/10"
  let currentRiskLevel = "Low"

  if (activeJourney) {
    currentRiskLevel = activeJourney.riskLevel
    if (activeJourney.riskLevel === "Medium") {
      currentRiskText = "Medium Risk"
      currentRiskColor = "text-amber-500"
      currentRiskBg = "bg-amber-500/10"
    } else if (activeJourney.riskLevel === "High") {
      currentRiskText = "High Risk"
      currentRiskColor = "text-red-500"
      currentRiskBg = "bg-red-500/10"
    }
  }

  // Get Trust Score badge description
  let trustBadge = "Moderate"
  let trustColor = "text-amber-500 border-amber-500/30 bg-amber-500/5"
  if (overallTrustScore >= 80) {
    trustBadge = "Excellent"
    trustColor = "text-emerald-500 border-emerald-500/30 bg-emerald-500/5"
  } else if (overallTrustScore >= 50) {
    trustBadge = "Good"
    trustColor = "text-blue-500 border-blue-500/30 bg-blue-500/5"
  }

  // Generate some recent alert items
  const recentAlerts = [
    { id: 1, type: "system", title: "Trust Score Updated", time: "10 mins ago", desc: "Successfully completed previous commute checks. Trust +2 points." },
    { id: 2, type: "danger", title: "New Unsafe Zone Reported", time: "2 hours ago", desc: "Koti Crossing flagged with 'Low Street Lighting' by local user." },
    { id: 3, type: "success", title: "Guardian Status Verified", time: "1 day ago", desc: "No deviations or delays registered during yesterday's DLF Office trip." }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-primary-light/10 to-secondary/10 dark:from-slate-800/50 dark:to-teal-950/20 p-6 rounded-2xl border border-borderLight">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-appText">
            Welcome back, <span className="text-secondary-light dark:text-secondary-dark">{user.name}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Guardian mode is armed. Your daily routes are active and monitored.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Guardian Shield:</span>
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck size={12} />
            ARMED & READY
          </span>
        </div>
      </div>

      {/* Grid of Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Commute Safety Score */}
        <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Today's Safety Score</span>
              <h3 className="text-3xl font-extrabold font-outfit text-appText mt-1">
                {lastTrip.safetyScore || 92} <span className="text-xs text-gray-400 font-normal">/ 100</span>
              </h3>
            </div>
            <div className="bg-secondary bg-opacity-10 p-2.5 rounded-xl text-secondary">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-borderLight flex justify-between items-center text-[10px] text-gray-500">
            <span>Last trip: {lastTrip.routesUsed || "APSRTC Bus"}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Excellent Status</span>
          </div>
        </div>

        {/* Card 2: Journey Trust Score with Circular SVG Gauge */}
        <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Journey Trust Score</span>
            <div className="flex items-baseline gap-1">
              <h3 className="text-3xl font-extrabold font-outfit text-appText">{overallTrustScore}</h3>
              <span className="text-[10px] text-gray-400">Index Rating</span>
            </div>
            <div className={`text-[10px] px-2 py-0.5 w-fit border rounded-full font-bold ${trustColor}`}>
              Badge: {trustBadge}
            </div>
          </div>
          {/* Circular SVG Gauge */}
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-secondary"
                strokeDasharray={`${overallTrustScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-extrabold font-outfit text-appText">{overallTrustScore}%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Current Risk Level */}
        <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Current Commute Risk</span>
              <h3 className={`text-2xl font-bold font-outfit mt-1 flex items-center gap-1.5 ${currentRiskColor}`}>
                {activeJourney ? `${activeJourney.riskPercentage}%` : "Low Risk"}
              </h3>
              <p className="text-[10px] text-gray-500 mt-1">
                {activeJourney ? "Calculated based on active route" : "No active journey registered"}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl ${currentRiskBg} ${currentRiskColor}`}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-borderLight flex justify-between items-center text-[10px] text-gray-500">
            <span>Area: Hyderabad Urban</span>
            <span className="font-bold text-secondary">{activeJourney ? "Active Tracking" : "Armed Mode"}</span>
          </div>
        </div>
      </div>

      {/* Grid of Quick Actions & Recent Journey Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Quick Actions & Live Status */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Live Journey Status Tracking Panel */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark transition-colors">
            <h2 className="text-lg font-bold font-outfit text-appText flex items-center gap-2 mb-4">
              <Navigation size={18} className="text-secondary rotate-45" />
              Current Journey Status
            </h2>
            
            {activeJourney ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-secondary bg-opacity-5 border border-secondary border-opacity-10">
                  <div>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active Route</span>
                    <p className="text-xs font-bold text-appText mt-0.5">
                      {activeJourney.source} <ArrowRight size={10} className="inline mx-1" /> {activeJourney.destination}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sosActive ? "bg-red-100 text-red-800 animate-pulse" : "bg-teal-100 text-teal-800"
                  }`}>
                    {sosActive ? "SOS Active" : activeJourney.safetyStatus}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>Journey Progress</span>
                    <span>{Math.floor(activeJourney.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-secondary h-full transition-all duration-300"
                      style={{ width: `${activeJourney.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to="/start-journey"
                    className="flex-grow text-center bg-primary text-white dark:bg-primary-dark dark:text-slate-900 py-2.5 rounded-xl text-xs font-bold hover:shadow transition"
                  >
                    Open Journey Console
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to end this journey?")) {
                        navigate("/start-journey") // Let StartJourney show scoring screen or wrap up
                      }
                    }}
                    className="bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/20 dark:border-red-900/30 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100 transition"
                  >
                    Cancel Journey
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-borderLight rounded-xl">
                <Compass className="mx-auto w-10 h-10 text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">No Active Commute Registered</p>
                <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto mt-1">
                  Enter your source and destination to initiate AI Guardian tracking and safety parameters.
                </p>
                <Link
                  to="/start-journey"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                >
                  Plan commute now <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/start-journey"
              className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark hover:border-secondary/30 transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="bg-primary/5 dark:bg-primary-dark/10 p-3 rounded-2xl text-primary group-hover:scale-105 transition duration-200">
                <Navigation size={20} className="rotate-45" />
              </div>
              <h4 className="text-xs font-bold text-appText font-outfit mt-1">Start Journey</h4>
              <span className="text-[9px] text-gray-400 max-w-[140px]">Setup AI Guardian & Route Transitions</span>
            </Link>

            <Link
              to="/heatmap"
              className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark hover:border-secondary/30 transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="bg-secondary bg-opacity-5 p-3 rounded-2xl text-secondary group-hover:scale-105 transition duration-200">
                <MapPin size={20} />
              </div>
              <h4 className="text-xs font-bold text-appText font-outfit mt-1">Safety Heatmap</h4>
              <span className="text-[9px] text-gray-400 max-w-[140px]">Report & View Commute Risk Zones</span>
            </Link>

            <Link
              to="/travel-together"
              className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark hover:border-secondary/30 transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="bg-blue-500/5 p-3 rounded-2xl text-blue-500 group-hover:scale-105 transition duration-200">
                <Users size={20} />
              </div>
              <h4 className="text-xs font-bold text-appText font-outfit mt-1">Travel Together</h4>
              <span className="text-[9px] text-gray-400 max-w-[140px]">Share Journey Status With Contacts</span>
            </Link>

            <Link
              to="/sos"
              className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark hover:border-red-500/30 transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="bg-red-500/5 p-3 rounded-2xl text-red-600 group-hover:scale-105 transition duration-200">
                <AlertTriangle size={20} />
              </div>
              <h4 className="text-xs font-bold text-appText font-outfit mt-1">Emergency SOS</h4>
              <span className="text-[9px] text-gray-400 max-w-[140px]">Simulate Hands-Free Panic Triggers</span>
            </Link>
          </div>
        </div>

        {/* Right Col: Recent Alerts & Info Box */}
        <div className="space-y-6">
          {/* Recent Alerts Card */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Recent Safety Updates</h3>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="text-xs space-y-1 pb-3 border-b border-borderLight last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-appText flex items-center gap-1">
                      {alert.type === "danger" ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      ) : alert.type === "success" ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      )}
                      {alert.title}
                    </span>
                    <span className="text-[10px] text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info / Team SafeHer Presentation Card */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-secondary/5 -rotate-12 select-none pointer-events-none">
              <Shield size={120} className="fill-current" />
            </div>
            
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Round 2 Hackathon Pitch</h4>
            <p className="text-xs font-bold text-appText">India Commute Safety 2026</p>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
              Travix AI targets the vulnerabilities of urban commuters. By combining multi-modal transition tracking with risk levels, we ensure passengers never fall off the tracking grid.
            </p>
            <Link
              to="/team"
              className="mt-3 block text-[10px] font-bold text-primary dark:text-primary-dark hover:underline"
            >
              Meet Team SafeHer ➔
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
