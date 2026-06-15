import React, { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useJourney } from "../context/JourneyContext"
import { Shield, Menu, X, Sun, Moon, AlertOctagon, User, LogOut, Navigation } from "lucide-react"

export default function Navbar({ user, onLogout }) {
  const { isDark, toggleTheme } = useTheme()
  const { activeJourney, sosActive, deactivateSOS } = useJourney()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { name: "Dashboard", path: "/dashboard", authRequired: true },
    { name: "Start Journey", path: "/start-journey", authRequired: true },
    { name: "Safety Heatmap", path: "/heatmap", authRequired: true },
    { name: "Travel Together", path: "/travel-together", authRequired: true },
    { name: "SOS Center", path: "/sos", authRequired: true },
    { name: "Profile", path: "/profile", authRequired: true },
    { name: "Team SafeHer", path: "/team", authRequired: false },
    { name: "Future Roadmap", path: "/roadmap", authRequired: false },
  ]

  const visibleItems = navItems.filter(item => !item.authRequired || user)

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-borderLight bg-opacity-90 backdrop-blur-md bg-appBg">
      {/* Dynamic Warning Banners for Judges to notice simulations */}
      {sosActive && (
        <div className="bg-red-600 text-white text-xs font-semibold py-1.5 px-4 flex justify-between items-center animate-pulse">
          <span className="flex items-center gap-2">
            <AlertOctagon size={14} className="animate-spin" />
            CRITICAL ALERT: Silent SOS Active! Location broadcasted to trusted contacts.
          </span>
          <button 
            onClick={deactivateSOS}
            className="bg-white text-red-600 hover:bg-red-50 text-[10px] px-2 py-0.5 rounded font-bold uppercase transition"
          >
            Deactivate
          </button>
        </div>
      )}

      {activeJourney && activeJourney.safetyStatus !== "Safe and on schedule" && !sosActive && (
        <div className="bg-orange-500 text-white text-xs font-semibold py-1 px-4 flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <AlertOctagon size={14} />
            AI GUARDIAN WARNING: {activeJourney.safetyStatus}
          </span>
          <button 
            onClick={() => navigate("/start-journey")}
            className="underline hover:text-orange-100 text-[10px] font-bold"
          >
            View Live Route
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-secondary p-2 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
              <Shield size={20} className="fill-current" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight font-outfit text-primary">
                Travix <span className="text-secondary">AI</span>
              </span>
              <p className="text-[9px] -mt-1 text-gray-500 font-medium hidden sm:block">Team SafeHer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 items-center">
            {visibleItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-secondary bg-secondary bg-opacity-10"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-appText"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Live Journey indicator */}
            {activeJourney && (
              <Link 
                to="/start-journey"
                className="flex items-center gap-1 text-[11px] font-semibold text-secondary-light dark:text-secondary-dark px-2.5 py-1 rounded-full border border-secondary border-opacity-30 bg-secondary bg-opacity-5 animate-pulse"
              >
                <Navigation size={10} className="rotate-45 fill-current" />
                Live Commute
              </Link>
            )}

            {/* User Profile / Auth */}
            {user ? (
              <div className="flex items-center gap-3 border-l border-borderLight pl-3">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 dark:bg-primary-dark dark:bg-opacity-20 flex items-center justify-center text-primary-light dark:text-primary-dark font-semibold text-xs border border-primary border-opacity-15">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold leading-3 text-appText group-hover:text-secondary transition-colors">{user.name}</p>
                    <span className="text-[10px] text-gray-500">{user.email}</span>
                  </div>
                </Link>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white dark:bg-primary-dark dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Live indicator on mobile */}
            {activeJourney && (
              <Link 
                to="/start-journey"
                className="flex items-center gap-1 text-[10px] font-semibold text-secondary-light dark:text-secondary-dark px-2 py-0.5 rounded-full border border-secondary border-opacity-20 bg-secondary bg-opacity-5"
              >
                <Navigation size={9} className="rotate-45 fill-current" />
                Live
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-borderLight bg-appBg px-4 pt-2 pb-4 space-y-1">
          {visibleItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="pt-4 border-t border-borderLight flex items-center justify-between px-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 dark:bg-primary-dark dark:bg-opacity-20 flex items-center justify-center text-primary-light dark:text-primary-dark font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  onLogout()
                }}
                className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 dark:border-red-900/30 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-borderLight">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full bg-primary text-white dark:bg-primary-dark dark:text-slate-900 py-2.5 rounded-lg font-semibold"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
