import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Shield, MapPin, Eye, Zap, AlertOctagon, Heart, Navigation, Car, Bus, Train, Home, Footprints } from "lucide-react"

export default function LandingPage() {
  const commuteFlow = [
    { name: "Auto", icon: Car, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950/30" },
    { name: "APSRTC Bus", icon: Bus, color: "text-red-500", bg: "bg-red-100 dark:bg-red-950/30" },
    { name: "Metro", icon: Train, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-950/30" },
    { name: "Walk", icon: Footprints, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-950/30" },
    { name: "Home", icon: Home, color: "text-secondary", bg: "bg-teal-100 dark:bg-teal-950/30" }
  ]

  const features = [
    {
      title: "AI Guardian Mode",
      desc: "Keeps a digital watch over your commute using smart rule-based tracking, stationary timeouts, and arrival triggers.",
      icon: Shield,
      color: "text-primary dark:text-primary-dark"
    },
    {
      title: "Safe Handover Tracking",
      desc: "Visually tracks transitions between Auto, Bus, Metro, and Walking, alerting contacts if handovers are delayed.",
      icon: Navigation,
      color: "text-secondary"
    },
    {
      title: "Safety Heatmap",
      desc: "Live Crowdsourced OpenStreetMap representation displaying Green (Safe), Yellow (Caution), and Red (High Risk) zones.",
      icon: MapPin,
      color: "text-accent-light"
    },
    {
      title: "Route Intelligence",
      desc: "Calculates and compares travel duration against safety percentage index ratings to recommend the absolute safest path.",
      icon: Zap,
      color: "text-secondary"
    },
    {
      title: "Journey Trust Score",
      desc: "Gain score ranks (0–100) and badges as you check-in, follow safe paths, and log safe commutes.",
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Voice-Free SOS",
      desc: "Emergency trigger simulations for volume-hold, shake alerts, and hidden screen gestures that instantly message contacts.",
      icon: AlertOctagon,
      color: "text-red-600"
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl -z-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Tagline Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-secondary bg-opacity-10 text-secondary dark:text-secondary-dark uppercase tracking-wider font-outfit border border-secondary border-opacity-20">
            From Ride Booking to Journey Protection
          </span>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-outfit text-appText max-w-4xl mx-auto leading-[1.1]">
            India's First AI-Powered <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-accent-light dark:from-primary-dark dark:via-secondary-dark dark:to-accent-dark">
              Predictive Mobility Safety
            </span> & Journey Protection
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Travix AI protects your daily commute. We analyze route risk percentages, log transition handovers, and provide silent emergency triggers.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/start-journey"
              className="bg-primary text-white dark:bg-primary-dark dark:text-slate-900 px-8 py-3.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Start Journey
            </Link>
            <Link
              to="/dashboard"
              className="bg-appCard text-appText border border-borderLight px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all duration-200 shadow-sm"
            >
              View Demo Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Animated Commute Flow Timeline */}
      <section className="bg-appCard border-y border-borderLight py-12 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-2">COMMUTE FLOW METRIC SIMULATION</h3>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-appText">Visualizing Multi-Modal Commute Handovers</h2>
          </div>

          <div className="relative">
            {/* Background connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0 hidden md:block"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {commuteFlow.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`w-14 h-14 rounded-full ${stage.bg} flex items-center justify-center border border-borderLight shadow-sm hover:scale-105 transition-transform duration-200 pulse-ring-effect`}>
                      <Icon className={`w-6 h-6 ${stage.color}`} />
                    </div>
                    <span className="text-xs font-bold text-appText mt-3 font-outfit">{stage.name}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {index === 4 ? "Destination" : `Transition ${index + 1}`}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-outfit text-appText">Commute Safety Reinvented</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            No expensive integrations or hardware required. We leverage rule-based algorithms to keep you secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark hover:border-secondary/30 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="p-3 rounded-xl bg-white dark:bg-gray-800 w-fit border border-borderLight shadow-sm">
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-bold font-outfit text-appText mt-4 mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="bg-gradient-to-br from-primary-light to-secondary dark:from-slate-900 dark:to-teal-950 border-t border-borderLight text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold font-outfit">Ready to protect your daily journey?</h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-medium">
            Join Team SafeHer in piloting India's premier commute protection layer. Completely free, offline-ready simulations.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="bg-white text-primary font-bold text-sm px-8 py-3 rounded-xl hover:bg-slate-50 shadow-md hover:scale-105 active:scale-98 transition inline-block"
            >
              Access Demo Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
