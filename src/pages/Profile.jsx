import React, { useState } from "react"
import { useJourney } from "../context/JourneyContext"
import { motion } from "framer-motion"
import { 
  User, 
  Shield, 
  MapPin, 
  Award, 
  Compass, 
  Clock, 
  Phone, 
  CheckCircle, 
  Sliders, 
  ChevronRight,
  TrendingUp,
  Activity
} from "lucide-react"

export default function Profile({ user }) {
  const { history, contacts, overallTrustScore } = useJourney()
  
  // Calculate average safety score
  const totalTrips = history.length
  const avgSafetyScore = totalTrips > 0
    ? Math.round(history.reduce((acc, curr) => acc + (curr.safetyScore || 0), 0) / totalTrips)
    : 92

  // Profile Form States
  const [profileName, setProfileName] = useState(user.name)
  const [profileEmail, setProfileEmail] = useState(user.email)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
    
    // Update localStorage
    localStorage.setItem("travix_user", JSON.stringify({ email: profileEmail, name: profileName }))
  }

  // List of mock badges
  const badges = [
    { name: "Safe Commuter", desc: "Successfully completed 3 transition handovers.", icon: Shield, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Grid Sentinel", desc: "Reported 2 or more safety hazard zones on the heatmap.", icon: MapPin, color: "text-secondary bg-secondary bg-opacity-10 border-secondary border-opacity-20" },
    { name: "First Responder", desc: "Configured trusted emergency contacts.", icon: Award, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-appText">User Profile & Metrics</h1>
        <p className="text-xs text-gray-500 mt-1">
          Review your commute score rankings, verified badges, and historical tracking statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User details, Form & Badges */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* User Bio Card */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-20 flex items-center justify-center font-extrabold text-3xl shrink-0">
              {profileName.charAt(0)}
            </div>
            
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl font-bold font-outfit text-appText">{profileName}</h2>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 w-fit rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mx-auto sm:mx-0">
                  Armed Sentinel
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{profileEmail}</p>
              <p className="text-[11px] text-gray-400 mt-2 font-medium">
                Commuting regularly across Hyderabad Urban, DLF Office Area, and Hitec City Grid.
              </p>
            </div>
          </div>

          {/* Core Analytics Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-appCard border border-borderLight p-4 rounded-2xl text-center space-y-1">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Total Trips</span>
              <p className="text-2xl font-extrabold font-outfit text-appText">{totalTrips}</p>
            </div>
            <div className="bg-appCard border border-borderLight p-4 rounded-2xl text-center space-y-1">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Avg Safety</span>
              <p className="text-2xl font-extrabold font-outfit text-appText">{avgSafetyScore}%</p>
            </div>
            <div className="bg-appCard border border-borderLight p-4 rounded-2xl text-center space-y-1">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Trust Index</span>
              <p className="text-2xl font-extrabold font-outfit text-appText">{overallTrustScore}</p>
            </div>
          </div>

          {/* Verified Badges Section */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Award size={14} className="text-secondary" />
              Verified Commute Badges
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {badges.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.name} className={`border rounded-xl p-4 flex flex-col justify-between border-borderLight bg-white dark:bg-gray-800/40 hover:border-gray-300 dark:hover:border-gray-700 transition`}>
                    <div className="space-y-2">
                      <div className={`p-2.5 rounded-xl w-fit ${b.color}`}>
                        <Icon size={18} />
                      </div>
                      <h4 className="text-xs font-bold text-appText">{b.name}</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-medium">{b.desc}</p>
                    </div>
                    
                    <div className="mt-4 pt-2 border-t border-borderLight flex items-center justify-between text-[9px] text-emerald-500 font-bold uppercase">
                      <span>✓ Unlocked</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Historical Trips Logs */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Clock size={14} className="text-secondary" />
              Commute Logs Checklist
            </h3>

            <div className="space-y-3">
              {history.map((trip) => (
                <div 
                  key={trip.id}
                  className="p-3 border border-borderLight rounded-xl bg-white dark:bg-gray-800/40 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-appText">
                      {trip.source} ➔ {trip.destination}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Date: {trip.date} | Modes: {trip.routesUsed}
                    </p>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <span className="text-[9px] text-gray-400 block font-semibold">Safety Score</span>
                      <span className="font-extrabold text-secondary">{trip.safetyScore}%</span>
                    </div>
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Settings & Contacts Summary */}
        <div className="space-y-6">
          
          {/* Edit Profile Form */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <div className="flex items-center gap-2 text-secondary pb-1 border-b border-borderLight">
              <Sliders size={16} />
              <h4 className="text-xs font-extrabold uppercase tracking-wider font-outfit">
                Account Settings
              </h4>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                  required
                />
              </div>

              {isSaved && (
                <div className="text-[10px] text-emerald-600 font-bold text-center">
                  ✓ Profile settings saved!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-secondary text-white font-bold rounded-xl text-xs hover:shadow hover:scale-[1.005] transition"
              >
                Save Profile
              </button>
            </form>
          </div>

          {/* Emergency Contacts Summary Widget */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <h4 className="text-xs font-bold text-appText uppercase tracking-wider">Active Safety Contacts</h4>
            
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.phone} className="flex items-center justify-between text-xs pb-2 border-b border-borderLight last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-gray-400" />
                    <div>
                      <h5 className="font-bold text-appText">{c.name}</h5>
                      <span className="text-[9px] text-gray-500">{c.relationship}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">{c.phone}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
