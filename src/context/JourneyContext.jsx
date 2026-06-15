import React, { createContext, useContext, useState, useEffect } from "react"

const JourneyContext = createContext()

// Indian cities coordinate mapping for simulated routes
const REGION_COORDS = {
  hyderabad: { lat: 17.3850, lng: 78.4867 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  delhi: { lat: 28.6139, lng: 77.2090 },
  mumbai: { lat: 19.0760, lng: 72.8777 }
}

const INITIAL_CONTACTS = [
  { name: "Priya Sharma", phone: "+91 98765 43210", relationship: "Sister" },
  { name: "Rajesh Kumar", phone: "+91 99887 76655", relationship: "Father" }
]

const INITIAL_HISTORY = [
  {
    id: "trip-1",
    date: "14 Jun 2026",
    source: "Hitec City Metro Station",
    destination: "Gachibowli DLF Office",
    duration: "18 mins",
    safetyScore: 94,
    trustScore: 92,
    status: "Completed",
    routesUsed: "APSRTC Bus -> Walk"
  },
  {
    id: "trip-2",
    date: "13 Jun 2026",
    source: "Secunderabad Railway Station",
    destination: "Begumpet Police Line",
    duration: "24 mins",
    safetyScore: 88,
    trustScore: 85,
    status: "Completed",
    routesUsed: "Metro -> Auto"
  },
  {
    id: "trip-3",
    date: "11 Jun 2026",
    source: "Koti Women's College",
    destination: "Jubilee Hills Road 36",
    duration: "32 mins",
    safetyScore: 91,
    trustScore: 96,
    status: "Completed",
    routesUsed: "Auto -> Metro -> Walk"
  }
]

const INITIAL_REPORTS = [
  { id: "rep-1", title: "Low Street Lighting", description: "Streetlights are completely off near the bus stop. High risk of stalking.", severity: "High Risk", lat: 17.4428, lng: 78.3792, date: "14 Jun 2026" },
  { id: "rep-2", title: "Crowded and Unruly Area", description: "Frequent catcalling reported near the railway crossing.", severity: "Caution", lat: 17.3912, lng: 78.4523, date: "13 Jun 2026" },
  { id: "rep-3", title: "Isolated Underpass", description: "Very dark underpass path, no CCTV cameras present.", severity: "High Risk", lat: 12.9812, lng: 77.6321, date: "12 Jun 2026" }
]

export function JourneyProvider({ children }) {
  // Contacts
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("travix_contacts")
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS
  })

  // Journey History
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("travix_history")
    return saved ? JSON.parse(saved) : INITIAL_HISTORY
  })

  // Unsafe Zone Reports
  const [unsafeReports, setUnsafeReports] = useState(() => {
    const saved = localStorage.getItem("travix_reports")
    return saved ? JSON.parse(saved) : INITIAL_REPORTS
  })

  // Active Journey
  const [activeJourney, setActiveJourney] = useState(null)
  
  // SOS State
  const [sosActive, setSosActive] = useState(false)
  const [sosMethod, setSosMethod] = useState(null) // 'shake', 'volume', 'gesture'

  // User Core Metrics (Overall Trust Score & Profile Stats)
  const [overallTrustScore, setOverallTrustScore] = useState(88)

  // Simulation parameters for demo mode
  const [simulationState, setSimulationState] = useState({
    delayProgress: 0, // 0 to 100%
    isStationary: false,
    stationaryTime: 0, // in simulated minutes
    hasRouteDeviation: false,
    hasTransitionDelay: false
  })

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("travix_contacts", JSON.stringify(contacts))
  }, [contacts])

  useEffect(() => {
    localStorage.setItem("travix_history", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem("travix_reports", JSON.stringify(unsafeReports))
  }, [unsafeReports])

  // Active Journey timer simulator (ticks elapsed time and progresses simulated values)
  useEffect(() => {
    let timer
    if (activeJourney && activeJourney.status !== "Completed") {
      timer = setInterval(() => {
        setActiveJourney((prev) => {
          if (!prev) return null
          const nextElapsed = prev.elapsedTime + 1
          
          // Calculate journey progress percentage based on elapsed vs expected time
          const durationMins = parseInt(prev.expectedDuration)
          const expectedSeconds = durationMins * 60
          let newProgress = Math.min((nextElapsed / expectedSeconds) * 100, 99)

          // If completed all steps, auto-wrap (handled by timeline manually, so cap progress at 99%)
          
          // Rule-Based Logic check: Delay calculation
          // If delay simulation is active or time elapsed exceeded expected time by >20%
          const isDelayed = prev.isSimulatedDelay || (nextElapsed > expectedSeconds * 1.2)
          
          return {
            ...prev,
            elapsedTime: nextElapsed,
            progress: newProgress,
            safetyStatus: isDelayed ? "Potential Delay Detected" : prev.safetyStatus
          }
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [activeJourney])

  // Timer for simulating stationary warning (adds 1 minute to stationary time every 2 seconds if enabled)
  useEffect(() => {
    let timer
    if (activeJourney && simulationState.isStationary) {
      timer = setInterval(() => {
        setSimulationState((prev) => {
          const nextTime = prev.stationaryTime + 1
          return {
            ...prev,
            stationaryTime: nextTime
          }
        })
      }, 2000) // 2 seconds = 1 simulated minute
    }
    return () => clearInterval(timer)
  }, [activeJourney, simulationState.isStationary])

  // Start a new journey
  const startJourney = (source, destination, eta, customRoute = null) => {
    // Generate risk assessment based on source, destination, and time of day
    const timeOfDay = new Date().getHours()
    let baseRisk = 12
    let riskLevel = "Low"
    let recommendation = "Route looks highly secure. Keep tracking enabled."

    // Simple rule-based risk generation
    if (timeOfDay >= 20 || timeOfDay <= 5) {
      baseRisk += 15
      recommendation = "Night travel alert: Stick to high-density arterial routes."
    }
    if (source.toLowerCase().includes("isolated") || destination.toLowerCase().includes("dark")) {
      baseRisk += 25
      recommendation = "Poor lighting reported. Use the Safest Route option."
    }
    
    if (baseRisk > 30) {
      riskLevel = "Medium"
    }
    if (baseRisk > 50) {
      riskLevel = "High"
      recommendation = "High risk route. Travel Together mode is strictly recommended."
    }

    const newJourney = {
      id: "active-" + Date.now(),
      source,
      destination,
      expectedDuration: eta || "20",
      elapsedTime: 0,
      progress: 0,
      currentStageIndex: 0, // Auto
      stages: ["Auto", "Bus", "Metro", "Walk", "Home"],
      status: "Active",
      safetyStatus: "Safe and on schedule",
      riskPercentage: baseRisk,
      riskLevel,
      recommendation,
      selectedRouteType: customRoute || "Recommended",
      isSimulatedDelay: false
    }

    setActiveJourney(newJourney)
    setSosActive(false)
    setSimulationState({
      delayProgress: 0,
      isStationary: false,
      stationaryTime: 0,
      hasRouteDeviation: false,
      hasTransitionDelay: false
    })
  }

  // Complete the current journey and score it
  const endActiveJourney = (completedSuccessfully = true) => {
    if (!activeJourney) return

    const scoreFactors = {
      completed: completedSuccessfully ? 60 : 0,
      routeFollowed: !simulationState.hasRouteDeviation ? 20 : 0,
      noRiskEvents: (!sosActive && !simulationState.isStationary) ? 20 : 10
    }

    const calculatedSafetyScore = scoreFactors.completed + scoreFactors.routeFollowed + scoreFactors.noRiskEvents
    const calculatedTrustScore = Math.min(100, Math.max(10, overallTrustScore + (completedSuccessfully ? 2 : -5)))

    const newTrip = {
      id: activeJourney.id,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      source: activeJourney.source,
      destination: activeJourney.destination,
      duration: `${Math.ceil(activeJourney.elapsedTime / 60)} mins`,
      safetyScore: calculatedSafetyScore,
      trustScore: calculatedTrustScore,
      status: completedSuccessfully ? "Completed" : "Incomplete",
      routesUsed: activeJourney.stages.slice(0, activeJourney.currentStageIndex + 1).join(" -> ") || "Walk"
    }

    setHistory((prev) => [newTrip, ...prev])
    setOverallTrustScore(calculatedTrustScore)
    setActiveJourney(null)
    setSosActive(false)
    resetSimulations()
  }

  // Contacts Actions
  const addContact = (name, phone, relationship) => {
    setContacts((prev) => [...prev, { name, phone, relationship }])
  }

  const removeContact = (phone) => {
    setContacts((prev) => prev.filter((c) => c.phone !== phone))
  }

  // Report Unsafe Area Actions
  const reportUnsafeArea = (title, description, severity, lat, lng) => {
    const newReport = {
      id: "rep-" + Date.now(),
      title,
      description,
      severity,
      lat: lat || 17.3850 + (Math.random() - 0.5) * 0.1,
      lng: lng || 78.4867 + (Math.random() - 0.5) * 0.1,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    }
    setUnsafeReports((prev) => [newReport, ...prev])
  }

  // SOS Activation
  const triggerSOS = (method = "shortcut") => {
    setSosActive(true)
    setSosMethod(method)
    if (activeJourney) {
      setActiveJourney((prev) => ({
        ...prev,
        safetyStatus: "EMERGENCY: SOS Triggered",
        riskLevel: "High"
      }))
    }
  }

  const deactivateSOS = () => {
    setSosActive(false)
    setSosMethod(null)
    if (activeJourney) {
      setActiveJourney((prev) => ({
        ...prev,
        safetyStatus: "Safe and on schedule",
        riskLevel: "Low"
      }))
    }
  }

  // Update handover stages
  const updateStageIndex = (index) => {
    if (!activeJourney) return
    setActiveJourney((prev) => {
      const isCompleted = index >= prev.stages.length - 1
      return {
        ...prev,
        currentStageIndex: index,
        status: isCompleted ? "Completed" : "Active",
        safetyStatus: isCompleted ? "Journey completed safely" : prev.safetyStatus
      }
    })

    if (index >= activeJourney.stages.length - 1) {
      // Small timeout to allow showing completed state before redirecting
      setTimeout(() => {
        endActiveJourney(true)
      }, 1500)
    }
  }

  // Manual trigger simulations (interactive panel for judges)
  const simulateDelay = () => {
    setActiveJourney((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        isSimulatedDelay: true,
        safetyStatus: "Potential Delay Detected (AI Guardian Alert)"
      }
    })
  }

  const simulateStationary = () => {
    setSimulationState((prev) => ({
      ...prev,
      isStationary: !prev.isStationary,
      stationaryTime: 0
    }))
  }

  const simulateRouteDeviation = () => {
    setSimulationState((prev) => ({
      ...prev,
      hasRouteDeviation: !prev.hasRouteDeviation
    }))
    
    setActiveJourney((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        riskPercentage: !simulationState.hasRouteDeviation ? Math.min(prev.riskPercentage + 35, 95) : Math.max(prev.riskPercentage - 35, 10),
        riskLevel: !simulationState.hasRouteDeviation ? "High" : "Low",
        safetyStatus: !simulationState.hasRouteDeviation ? "Route Deviation Detected" : "Back on track"
      }
    })
  }

  const simulateTransitionDelay = () => {
    setSimulationState((prev) => ({
      ...prev,
      hasTransitionDelay: !prev.hasTransitionDelay
    }))
    
    setActiveJourney((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        safetyStatus: !simulationState.hasTransitionDelay ? "Missed Journey Transition" : "Transition resolved"
      }
    })
  }

  const resetSimulations = () => {
    setSimulationState({
      delayProgress: 0,
      isStationary: false,
      stationaryTime: 0,
      hasRouteDeviation: false,
      hasTransitionDelay: false
    })
    if (activeJourney) {
      setActiveJourney((prev) => ({
        ...prev,
        isSimulatedDelay: false,
        riskLevel: "Low",
        riskPercentage: 15,
        safetyStatus: "Safe and on schedule"
      }))
    }
  }

  return (
    <JourneyContext.Provider
      value={{
        contacts,
        history,
        unsafeReports,
        activeJourney,
        sosActive,
        sosMethod,
        overallTrustScore,
        simulationState,
        startJourney,
        endActiveJourney,
        addContact,
        removeContact,
        reportUnsafeArea,
        triggerSOS,
        deactivateSOS,
        updateStageIndex,
        simulateDelay,
        simulateStationary,
        simulateRouteDeviation,
        simulateTransitionDelay,
        resetSimulations,
        setSimulationState,
        REGION_COORDS
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error("useJourney must be used within a JourneyProvider")
  }
  return context
}
