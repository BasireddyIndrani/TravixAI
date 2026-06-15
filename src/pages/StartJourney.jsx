import React, { useState } from "react"
import { useJourney } from "../context/JourneyContext"
import SafetyMap from "../components/SafetyMap"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Shield, 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  RefreshCw,
  Volume2,
  PhoneCall,
  UserCheck
} from "lucide-react"

export default function StartJourney() {
  const { 
    activeJourney, 
    startJourney, 
    endActiveJourney, 
    updateStageIndex, 
    simulationState,
    triggerSOS,
    sosActive,
    simulateDelay,
    simulateStationary,
    simulateRouteDeviation,
    simulateTransitionDelay,
    resetSimulations
  } = useJourney()

  // Input states
  const [source, setSource] = useState("Hitec City Metro Station")
  const [destination, setDestination] = useState("Gachibowli DLF Office")
  const [eta, setEta] = useState("20")
  const [routePlanned, setRoutePlanned] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState("Safest")

  const handlePlanRoute = (e) => {
    e.preventDefault()
    if (source && destination) {
      setRoutePlanned(true)
    }
  }

  const handleStartJourney = () => {
    startJourney(source, destination, eta, selectedRoute)
  }

  // Multi-modal steps list
  const steps = [
    { name: "Auto", desc: "Boarded Auto from Metro station" },
    { name: "Bus", desc: "APSRTC Bus transition checkpoint" },
    { name: "Metro", desc: "Metro Rail Blue Line ride" },
    { name: "Walk", desc: "Walking through final layout" },
    { name: "Home", desc: "Safe check-in completed" }
  ]

  // Mock routes comparison data
  const routeOptions = [
    {
      type: "Fastest",
      name: "Route A (Via Arterial Ring Rd)",
      time: "18 mins",
      distance: "6.2 km",
      safety: 68,
      risk: "Medium",
      color: "text-amber-500 border-amber-500/20 bg-amber-500/5",
      desc: "Lacks streetlights along the last 800m bypass lane."
    },
    {
      type: "Safest",
      name: "Route B (Via High-Density Corridor)",
      time: "22 mins",
      distance: "7.8 km",
      safety: 91,
      risk: "Low",
      color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5",
      desc: "Fully lit, CCTV active, and heavy commercial activity.",
      recommended: true
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-300">
      
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-appText">AI Guardian Ride Mode</h1>
        <p className="text-xs text-gray-500 mt-1">
          Select routes based on safety ratings and monitor transitions with automated handover checks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Planner / Journey Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section A: Journey Planner Form */}
          {!activeJourney && !routePlanned && (
            <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark">
              <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Plan Your Commute</h3>
              <form onSubmit={handlePlanRoute} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Starting Point</label>
                    <input
                      type="text"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="Enter source location..."
                      className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Destination</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter destination location..."
                      className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Expected Duration (Minutes)</label>
                  <input
                    type="number"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    placeholder="20"
                    className="w-64 block px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary text-white dark:bg-primary-dark dark:text-slate-900 px-6 py-2.5 rounded-xl text-xs font-bold hover:shadow-md hover:scale-[1.01] transition"
                >
                  Analyze Safe Routes
                </button>
              </form>
            </div>
          )}

          {/* Section B: Route Selection Cards */}
          {!activeJourney && routePlanned && (
            <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-appText uppercase tracking-wider">Safe Route Options Analyzed</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Comparing infrastructure, lights, and crowd levels.</p>
                </div>
                <button
                  onClick={() => setRoutePlanned(false)}
                  className="text-xs text-secondary hover:underline"
                >
                  Edit Location
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routeOptions.map((opt) => (
                  <div
                    key={opt.type}
                    onClick={() => setSelectedRoute(opt.type)}
                    className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                      selectedRoute === opt.type
                        ? "border-secondary bg-secondary bg-opacity-5"
                        : "border-borderLight hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/40"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                        {opt.type}
                      </span>
                      {opt.recommended && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-20">
                          Recommended
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-appText mt-3">{opt.name}</h4>
                    
                    <div className="flex gap-4 mt-3 text-xs">
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase">Duration</span>
                        <span className="font-bold text-appText">{opt.time}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase">Distance</span>
                        <span className="font-bold text-appText">{opt.distance}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase">Safety Score</span>
                        <span className={`font-extrabold text-xs block mt-0.5 ${opt.safety >= 80 ? "text-emerald-500" : "text-amber-500"}`}>
                          {opt.safety}%
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 border-t border-borderLight pt-2 italic">
                      {opt.desc}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartJourney}
                className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl text-xs hover:shadow hover:scale-[1.005] transition flex items-center justify-center gap-1.5"
              >
                <Shield size={14} className="fill-current" />
                Initialize Safe Handover tracking
              </button>
            </div>
          )}

          {/* Section C: Active Tracking Controls */}
          {activeJourney && (
            <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-6">
              
              {/* Active Header */}
              <div className="flex justify-between items-start border-b border-borderLight pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">AI GUARDIAN ENFORCED TRACKING</span>
                  <h3 className="text-base font-bold text-appText mt-0.5">
                    {activeJourney.source} <ArrowRight size={10} className="inline mx-1" /> {activeJourney.destination}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Elapsed / Expected</span>
                  <p className="text-xs font-bold text-appText">
                    {Math.floor(activeJourney.elapsedTime / 60)} mins / {activeJourney.expectedDuration} mins
                  </p>
                </div>
              </div>

              {/* Warnings / Anomaly boxes (Dynamic) */}
              <AnimatePresence>
                {simulationState.hasRouteDeviation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2"
                  >
                    <AlertTriangle size={16} className="animate-bounce" />
                    <div>
                      <p className="font-bold">Route Deviation Detected</p>
                      <p className="text-[10px] opacity-90">Risk factor increased. Contacts notified. Initiating automatic verification checks.</p>
                    </div>
                  </motion.div>
                )}

                {simulationState.hasTransitionDelay && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-xl flex items-center gap-2"
                  >
                    <AlertTriangle size={16} />
                    <div>
                      <p className="font-bold">Missed Journey Transition Warning</p>
                      <p className="text-[10px] opacity-90 font-medium">Auto-to-Bus handover delayed. Verify transition status or tap Help.</p>
                    </div>
                  </motion.div>
                )}

                {activeJourney.isSimulatedDelay && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-xl flex items-center gap-2"
                  >
                    <Clock size={16} />
                    <div>
                      <p className="font-bold">Potential Commute Delay Detected</p>
                      <p className="text-[10px] opacity-90 font-medium">Elapsed time has exceeded route threshold by 20%. Safety verification recommended.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Safe Handover Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Commute Timeline Check-Ins</h4>
                
                <div className="relative pl-6 space-y-6">
                  {/* Vertical progress line */}
                  <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

                  {steps.map((step, idx) => {
                    const isActive = idx === activeJourney.currentStageIndex
                    const isCompleted = idx < activeJourney.currentStageIndex
                    
                    return (
                      <div key={step.name} className="relative flex justify-between items-start text-xs z-10">
                        {/* Dot */}
                        <div className={`absolute -left-[20px] w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                          isCompleted ? "bg-secondary border-secondary text-white" :
                          isActive ? "bg-white dark:bg-gray-800 border-secondary scale-110" :
                          "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 size={10} className="fill-current" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          )}
                        </div>

                        {/* Text */}
                        <div className="pl-2">
                          <h5 className={`font-bold ${isActive ? "text-secondary-light dark:text-secondary-dark" : "text-appText"}`}>
                            {step.name}
                          </h5>
                          <p className="text-[11px] text-gray-400 mt-0.5">{step.desc}</p>
                        </div>

                        {/* Handover Check-In Button */}
                        {isActive && idx < steps.length - 1 && (
                          <button
                            onClick={() => updateStageIndex(idx + 1)}
                            className="bg-secondary hover:bg-opacity-95 text-white font-bold text-[10px] px-3 py-1 rounded-full shadow transition"
                          >
                            Mark Complete
                          </button>
                        )}
                        
                        {isActive && idx === steps.length - 1 && (
                          <button
                            onClick={() => endActiveJourney(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] px-3.5 py-1 rounded-full shadow transition"
                          >
                            Complete Journey
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Progress Slider Display */}
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                  <span>Simulated Location Coordinates</span>
                  <span>Safety Status: normal</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-secondary h-full transition-all duration-300"
                    style={{ width: `${activeJourney.progress}%` }}
                  ></div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Right Column: Maps Overlay & Simulation Controls */}
        <div className="space-y-6">
          
          {/* Active Map Preview */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-4 shadow-premium dark:shadow-premiumDark space-y-3">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Live Route Telemetry</h4>
            <SafetyMap interactive={false} />
          </div>

          {/* SIMULATION CONTROL PANEL FOR HACKATHON JUDGES */}
          <div className="bg-appCard border-2 border-dashed border-secondary/30 rounded-2xl p-5 shadow-premium dark:shadow-premiumDark space-y-4">
            <div className="flex items-center gap-2 text-secondary-light dark:text-secondary-dark border-b border-borderLight pb-3">
              <Shield size={16} />
              <h4 className="text-xs font-extrabold uppercase tracking-wider font-outfit">Judge Simulation Panel</h4>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
              Demo Travix AI's real-time safety logic in seconds. Click options below to simulate commute situations:
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <button
                disabled={!activeJourney}
                onClick={simulateDelay}
                className="py-2.5 px-2 bg-white dark:bg-gray-800 border border-borderLight hover:border-orange-400 rounded-xl font-bold text-appText transition disabled:opacity-40"
              >
                Simulate Delay &gt;20%
              </button>

              <button
                disabled={!activeJourney}
                onClick={simulateStationary}
                className={`py-2.5 px-2 border rounded-xl font-bold transition disabled:opacity-40 ${
                  simulationState.isStationary 
                    ? "bg-orange-500 text-white border-orange-600" 
                    : "bg-white dark:bg-gray-800 border-borderLight hover:border-orange-400 text-appText"
                }`}
              >
                {simulationState.isStationary ? "Stop Stop Simulation" : "Simulate 10m Stop"}
              </button>

              <button
                disabled={!activeJourney}
                onClick={simulateRouteDeviation}
                className={`py-2.5 px-2 border rounded-xl font-bold transition disabled:opacity-40 ${
                  simulationState.hasRouteDeviation 
                    ? "bg-red-600 text-white border-red-700" 
                    : "bg-white dark:bg-gray-800 border-borderLight hover:border-red-400 text-appText"
                }`}
              >
                {simulationState.hasRouteDeviation ? "Stop Deviation" : "Simulate Deviation"}
              </button>

              <button
                disabled={!activeJourney}
                onClick={simulateTransitionDelay}
                className={`py-2.5 px-2 border rounded-xl font-bold transition disabled:opacity-40 ${
                  simulationState.hasTransitionDelay 
                    ? "bg-orange-500 text-white border-orange-600" 
                    : "bg-white dark:bg-gray-800 border-borderLight hover:border-orange-400 text-appText"
                }`}
              >
                {simulationState.hasTransitionDelay ? "Resolve Transition" : "Simulate Late Check-In"}
              </button>
            </div>

            {activeJourney && (
              <button
                onClick={resetSimulations}
                className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-appText font-bold rounded-xl text-[10px] transition border border-borderLight"
              >
                Reset Anomaly States
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Stationary Alert Popup Modal */}
      <AnimatePresence>
        {simulationState.isStationary && simulationState.stationaryTime >= 5 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-gray-800 border border-red-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-4"
            >
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-950/20 text-red-600 rounded-full flex items-center justify-center animate-pulse">
                <HelpCircle size={24} />
              </div>
              
              <div>
                <h3 className="text-base font-bold font-outfit text-appText">Are You Safe?</h3>
                <p className="text-xs text-gray-500 mt-1">
                  You have remained stationary for over 10 minutes near your route transition.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    // Reset stationary state
                    resetSimulations()
                  }}
                  className="flex-grow py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1"
                >
                  <UserCheck size={14} />
                  I AM SAFE
                </button>
                <button
                  onClick={() => {
                    triggerSOS("stationary")
                    resetSimulations()
                  }}
                  className="flex-grow py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1"
                >
                  <PhoneCall size={14} />
                  NEED HELP
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
