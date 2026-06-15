import React, { useState, useEffect } from "react"
import { useJourney } from "../context/JourneyContext"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AlertTriangle, 
  ShieldAlert, 
  VolumeX, 
  Smartphone, 
  HelpCircle, 
  XOctagon, 
  Radio, 
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react"

export default function SosCenter() {
  const { sosActive, triggerSOS, deactivateSOS, contacts } = useJourney()
  
  // Local trigger simulation states
  const [countdown, setCountdown] = useState(0)
  const [countdownTimer, setCountdownTimer] = useState(null)
  
  // Acceleration simulation
  const [shakeValue, setShakeValue] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  
  // Volume hold simulation
  const [volPressCount, setVolPressCount] = useState(0)
  const [volTimer, setVolTimer] = useState(null)

  // Pattern gesture simulation
  const [gestureSteps, setGestureSteps] = useState([])
  const targetPattern = ["Top-Left", "Bottom-Right", "Top-Right", "Bottom-Left"]

  // Handle countdown logic for SOS activation
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && countdownTimer) {
      triggerSOS("countdown")
      setCountdownTimer(null)
    }
  }, [countdown])

  const startSOSCountdown = () => {
    setCountdown(5)
    setCountdownTimer(true)
  }

  const cancelSOSCountdown = () => {
    setCountdown(0)
    setCountdownTimer(null)
  }

  // Simulator: Shake Alert
  const handleSimulateShake = () => {
    setIsShaking(true)
    setShakeValue(0)
    
    // Animate shake speed
    let interval = setInterval(() => {
      setShakeValue((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          setTimeout(() => {
            setIsShaking(false)
            triggerSOS("shake")
          }, 300)
          return 100
        }
        return prev + 20
      })
    }, 150)
  }

  // Simulator: Volume buttons hold
  const handleSimulateVolumeHold = () => {
    setVolPressCount((prev) => {
      const next = prev + 1
      if (next >= 3) {
        triggerSOS("volume_buttons")
        return 0
      }
      return next
    })
    
    // Reset volume timer after 2.5s
    if (volTimer) clearTimeout(volTimer)
    const timer = setTimeout(() => {
      setVolPressCount(0)
    }, 2500)
    setVolTimer(timer)
  }

  // Simulator: Silent Pattern Gestures
  const handlePatternNodeClick = (nodeName) => {
    setGestureSteps((prev) => {
      const next = [...prev, nodeName]
      
      // Check if we matched the 4 points
      if (next.length === 4) {
        const isMatched = next.every((val, idx) => val === targetPattern[idx])
        if (isMatched) {
          triggerSOS("silent_gesture")
        }
        return []
      }
      return next
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-appText">Silent SOS Emergency Center</h1>
        <p className="text-xs text-gray-500 mt-1">
          Trigger emergency distress signals manually or simulate our hands-free silent triggers designed for critical scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: SOS Action & Countdown Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-appCard border border-borderLight rounded-2xl p-8 shadow-premium dark:shadow-premiumDark text-center flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
            
            {/* Pulsing visual circles in background if active */}
            {sosActive && (
              <div className="absolute inset-0 bg-red-500/5 dark:bg-red-950/10 animate-pulse pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-red-500/20 animate-ping" style={{ animationDuration: "2s" }}></div>
                  <div className="w-96 h-96 rounded-full border border-red-500/10 animate-ping" style={{ animationDuration: "3s" }}></div>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {sosActive ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 z-10"
                >
                  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse text-white">
                    <ShieldAlert size={48} className="animate-bounce" />
                  </div>
                  
                  <div className="space-y-2 max-w-md mx-auto">
                    <h2 className="text-xl font-bold text-red-600 dark:text-red-400 font-outfit">
                      EMERGENCY ALERTS ACTIVE
                    </h2>
                    <p className="text-xs text-gray-500">
                      Silent alarms have been triggered. Your real-time telemetry, battery percentage, and audio streams are broadcasted to:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {contacts.map((c) => (
                        <span key={c.phone} className="text-[10px] font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900/30">
                          {c.name} ({c.relationship})
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={deactivateSOS}
                    className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-[1.02] transition"
                  >
                    Cancel Emergency & Reset
                  </button>
                </motion.div>
              ) : countdown > 0 ? (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 z-10"
                >
                  <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-extrabold font-outfit relative">
                    <Clock size={32} className="absolute inset-0 m-auto opacity-10 animate-spin" style={{ animationDuration: "10s" }} />
                    <span className="relative z-10">{countdown}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-appText">Triggering SOS Grid Broadcast</h3>
                    <p className="text-[11px] text-gray-400 max-w-[280px] mx-auto leading-relaxed">
                      Broadcasting emergency telemetry packets in {countdown} seconds. Tap below to halt.
                    </p>
                  </div>

                  <button
                    onClick={cancelSOSCountdown}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-appText font-bold text-xs rounded-xl border border-borderLight transition"
                  >
                    Abort Broadcast
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 z-10"
                >
                  <button
                    onClick={startSOSCountdown}
                    className="w-32 h-32 bg-red-600 hover:bg-red-700 text-white rounded-full flex flex-col items-center justify-center shadow-2xl hover:scale-[1.03] transition group border-4 border-red-500/20"
                  >
                    <AlertTriangle size={32} className="fill-current group-hover:scale-110 transition" />
                    <span className="text-[11px] font-extrabold uppercase mt-1 tracking-wider">TAP TO SOS</span>
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Manual Distress Trigger
                    </h3>
                    <p className="text-[11px] text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                      Initiates a 5-second grace countdown before broadcasting secure emergency payloads to your registered guardians.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active Log Grid if Active */}
          {sosActive && (
            <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Radio size={14} className="text-red-500 animate-pulse" />
                Live Broadcast Payload Logs
              </h3>

              <div className="space-y-2 font-mono text-[10px] text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-borderLight">
                <p>⚡ [00:01] Broadcast initiated via silent trigger matrix.</p>
                <p>📍 [00:02] GPS Coordinates locked: Lat 17.3850, Lng 78.4867 (Hyderabad Grid).</p>
                <p>💬 [00:02] SMS packets dispatched to Sister (Priya Sharma) and Father (Rajesh Kumar).</p>
                <p>🔒 [00:03] Secure telemetry tunnel established. Capturing device battery (88%) & network signal strength.</p>
                <p>● [00:04] Live tracking status: Waiting for guardian handshake...</p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Hands-Free Simulators */}
        <div className="space-y-6">
          
          {/* Shake Simulator Card */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <h4 className="text-xs font-bold text-appText uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone size={16} className="text-secondary" />
              1. Shake Detection Simulator
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              Simulates a panic accelerometer trigger. If device acceleration matches critical shake intensity, the system launches SOS.
            </p>

            {isShaking ? (
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] uppercase font-bold text-orange-500">
                  <span>Simulating Shake Intensity</span>
                  <span>{shakeValue}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full transition-all duration-150"
                    style={{ width: `${shakeValue}%` }}
                  ></div>
                </div>
                <div className="text-[9px] text-gray-400 text-center italic">Shaking device mockup rapidly...</div>
              </div>
            ) : (
              <button
                disabled={sosActive}
                onClick={handleSimulateShake}
                className="w-full py-2.5 bg-white dark:bg-gray-800 border border-borderLight hover:border-orange-400 text-appText font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-40"
              >
                Simulate 5s Rapid Shake
              </button>
            )}
          </div>

          {/* Volume Key hold Simulator Card */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <h4 className="text-xs font-bold text-appText uppercase tracking-wider flex items-center gap-1.5">
              <VolumeX size={16} className="text-secondary" />
              2. Volume Button Trigger Simulator
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              Holding down both volume keys for 3 consecutive seconds triggers the silent panic alert. Tap below rapidly to simulate.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400">
                Presses: <span className="text-secondary">{volPressCount} / 3</span>
              </span>
              <button
                disabled={sosActive}
                onClick={handleSimulateVolumeHold}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-borderLight hover:border-secondary text-appText font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-40"
              >
                Press Volume Key
              </button>
            </div>
          </div>

          {/* Hidden Pattern Gesture Simulator Card */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <h4 className="text-xs font-bold text-appText uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={16} className="text-secondary" />
              3. Silent Swipe Gesture Pattern
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              Draw the secret distress code to alert contacts with a blacked out screen. Tapping order: <strong>Top-Left ➔ Bottom-Right ➔ Top-Right ➔ Bottom-Left</strong>.
            </p>

            {/* Pattern Grid mockup */}
            <div className="grid grid-cols-2 gap-3 max-w-[200px] mx-auto my-4">
              {["Top-Left", "Top-Right", "Bottom-Left", "Bottom-Right"].map((node) => {
                const stepIndex = gestureSteps.indexOf(node)
                const isSelected = stepIndex !== -1

                return (
                  <button
                    key={node}
                    disabled={sosActive}
                    onClick={() => handlePatternNodeClick(node)}
                    className={`h-12 border-2 rounded-xl flex items-center justify-center font-bold text-[10px] transition ${
                      isSelected
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : "border-borderLight bg-white dark:bg-gray-800 text-gray-400 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    {isSelected ? `Step ${stepIndex + 1}` : node}
                  </button>
                )
              })}
            </div>
            {gestureSteps.length > 0 && (
              <button
                onClick={() => setGestureSteps([])}
                className="w-full text-center text-[10px] text-gray-400 hover:underline"
              >
                Reset Pattern Progress
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
