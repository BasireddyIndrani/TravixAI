import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { JourneyProvider } from "./context/JourneyContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Page Imports
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import StartJourney from "./pages/StartJourney"
import SafetyHeatmapPage from "./pages/SafetyHeatmapPage"
import TravelTogether from "./pages/TravelTogether"
import SosCenter from "./pages/SosCenter"
import Profile from "./pages/Profile"
import TeamSafeHer from "./pages/TeamSafeHer"
import Roadmap from "./pages/Roadmap"

function AppContent() {
  const [user, setUser] = useState(null)

  // Initialize with a mock user for demo purposes if nothing is in local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("travix_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Auto-login default user for demo-readiness
      const defaultUser = { email: "aditi.rao@gmail.com", name: "Aditi Rao" }
      localStorage.setItem("travix_user", JSON.stringify(defaultUser))
      setUser(defaultUser)
    }
  }, [])

  const handleLogin = (email, name) => {
    const newUser = { email, name: name || "Aditi Rao" }
    localStorage.setItem("travix_user", JSON.stringify(newUser))
    setUser(newUser)
  }

  const handleLogout = () => {
    localStorage.removeItem("travix_user")
    setUser(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-appBg text-appText transition-colors duration-300">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage user={user} onLogin={handleLogin} />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/start-journey" 
            element={user ? <StartJourney /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/heatmap" 
            element={user ? <SafetyHeatmapPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/travel-together" 
            element={user ? <TravelTogether /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/sos" 
            element={user ? <SosCenter /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="/team" element={<TeamSafeHer />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <JourneyProvider>
        <Router>
          <AppContent />
        </Router>
      </JourneyProvider>
    </ThemeProvider>
  )
}
