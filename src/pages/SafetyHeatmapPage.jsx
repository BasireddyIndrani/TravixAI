import React, { useState } from "react"
import { useJourney } from "../context/JourneyContext"
import SafetyMap from "../components/SafetyMap"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, MapPin, Eye, Plus, Shield, ShieldAlert, Sparkles, Navigation, Calendar } from "lucide-react"

export default function SafetyHeatmapPage() {
  const { unsafeReports, reportUnsafeArea } = useJourney()
  
  // Local Form State
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState("High Risk")
  const [selectedLat, setSelectedLat] = useState(17.3850)
  const [selectedLng, setSelectedLng] = useState(78.4867)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)

  const handleMapClick = (lat, lng) => {
    setSelectedLat(parseFloat(lat.toFixed(5)))
    setSelectedLng(parseFloat(lng.toFixed(5)))
    setIsFormVisible(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) return

    reportUnsafeArea(title, description, severity, selectedLat, selectedLng)
    
    // Reset form
    setTitle("")
    setDescription("")
    setSeverity("High Risk")
    setShowSuccessMsg(true)
    setTimeout(() => {
      setShowSuccessMsg(false)
      setIsFormVisible(false)
    }, 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-appText">
            Crowdsourced Safety Heatmap
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse active risk zones reported by fellow daily commuters, or click on the map to log a new safety hazard.
          </p>
        </div>
        
        {/* Toggle Form Button */}
        {!isFormVisible && (
          <button
            onClick={() => {
              setSelectedLat(17.3850 + (Math.random() - 0.5) * 0.05)
              setSelectedLng(78.4867 + (Math.random() - 0.5) * 0.05)
              setIsFormVisible(true)
            }}
            className="inline-flex items-center gap-1.5 bg-secondary text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:shadow-md hover:scale-[1.01] transition"
          >
            <Plus size={14} />
            Report New Hazard
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Map Grid - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-appCard border border-borderLight rounded-2xl p-4 shadow-premium dark:shadow-premiumDark">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Live OpenStreetMap Core Telemetry Grid
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                ● Connected to Live Database
              </span>
            </div>
            <SafetyMap 
              interactive={true} 
              onMapClick={handleMapClick} 
            />
          </div>

          {/* Incidents List Header */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark">
            <h3 className="text-sm font-bold text-appText uppercase tracking-wider mb-4">
              Recently Reported Hazards
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unsafeReports.map((report) => {
                const isHighRisk = report.severity === "High Risk"
                return (
                  <div 
                    key={report.id}
                    className={`border rounded-xl p-4 flex flex-col justify-between transition hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-800/40 ${
                      isHighRisk 
                        ? "border-red-500/20 bg-red-500/[0.01]" 
                        : "border-borderLight"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          isHighRisk 
                            ? "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                        }`}>
                          {report.severity}
                        </span>
                        <span className="text-[9px] text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {report.date}
                        </span>
                      </div>
                      
                      <h4 className="text-xs font-bold text-appText">{report.title}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                        {report.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-borderLight flex items-center justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-0.5">
                        <MapPin size={10} />
                        {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
                      </span>
                      <span className="font-semibold text-primary dark:text-primary-dark">Active Flag</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Reporting Form / Dynamic Side Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {isFormVisible ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4"
              >
                <div className="flex justify-between items-center border-b border-borderLight pb-3">
                  <h3 className="text-xs font-bold text-appText uppercase tracking-wider">
                    Log Commute Hazard
                  </h3>
                  <button 
                    onClick={() => setIsFormVisible(false)}
                    className="text-gray-400 hover:text-appText text-xs font-bold"
                  >
                    ✕ Cancel
                  </button>
                </div>

                {showSuccessMsg ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                      <Shield size={24} className="fill-current" />
                    </div>
                    <h4 className="text-xs font-bold text-appText">Hazard Successfully Logged!</h4>
                    <p className="text-[11px] text-gray-400 max-w-[200px] mx-auto">
                      Your report has been broadcasted to all safety maps and guardians in the area.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Location coordinates auto-filled info */}
                    <div className="bg-secondary bg-opacity-5 p-3 rounded-xl border border-secondary border-opacity-10 text-[10px] text-gray-500 flex items-start gap-1.5">
                      <Sparkles size={12} className="text-secondary-light shrink-0 mt-0.5" />
                      <p>
                        Coordinates auto-filled by tapping the map, or enter custom ones.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                        Hazard Heading / Category
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Broken Streetlights near station"
                        className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                        Description & Details
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe lighting level, police presence, CCTV coverage, crowd size..."
                        rows={3}
                        className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Latitude</label>
                        <input
                          type="number"
                          step="0.00001"
                          value={selectedLat}
                          onChange={(e) => setSelectedLat(parseFloat(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Longitude</label>
                        <input
                          type="number"
                          step="0.00001"
                          value={selectedLng}
                          onChange={(e) => setSelectedLng(parseFloat(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Severity Level</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setSeverity("Caution")}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                            severity === "Caution"
                              ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "border-borderLight bg-white dark:bg-gray-800 text-gray-400"
                          }`}
                        >
                          Caution
                        </button>
                        <button
                          type="button"
                          onClick={() => setSeverity("High Risk")}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                            severity === "High Risk"
                              ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                              : "border-borderLight bg-white dark:bg-gray-800 text-gray-400"
                          }`}
                        >
                          High Risk
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-secondary text-white font-bold rounded-xl text-xs hover:shadow hover:scale-[1.005] transition flex items-center justify-center gap-1.5"
                    >
                      <ShieldAlert size={14} className="fill-current" />
                      Publish Hazard Incident
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="instructions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4"
              >
                <div className="flex items-center gap-2 text-secondary pb-1 border-b border-borderLight">
                  <Shield size={16} />
                  <h4 className="text-xs font-extrabold uppercase tracking-wider font-outfit">
                    AI Route Intelligence
                  </h4>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  Travix AI parses crowdsourced signals to evaluate safety index levels. 
                  When commuters plan a route, they are guided away from zones marked as "High Risk".
                </p>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-2.5 text-[11px]">
                  <div className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <p className="text-gray-500">
                      <strong>Safe Corridor:</strong> Light index &gt; 80%, CCTV coverage verified, active transit flow.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <p className="text-gray-500">
                      <strong>Caution Zone:</strong> Moderate light index (30-80%), minor delays, high congestion.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <p className="text-gray-500">
                      <strong>High Risk Zone:</strong> Dark alleys (light index &lt; 30%), isolated crossings, past incident tags.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-[10px] text-gray-500">
                  <p className="font-bold text-primary dark:text-primary-dark uppercase mb-0.5">Quick Guide</p>
                  Clicking coordinates directly on the Live Map instantly initiates the hazard logging sequence.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
