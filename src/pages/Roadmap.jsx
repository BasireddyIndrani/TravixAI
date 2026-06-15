import React, { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Calendar, Code, CheckCircle, Check, ArrowRight, ShieldCheck, Milestone, Cpu, Signal, Mic } from "lucide-react"

export default function Roadmap() {
  const milestones = [
    {
      phase: "Phase 1: Foundation",
      status: "Completed",
      date: "Q2 2026",
      title: "Leaflet Web Commute Prototype",
      desc: "Developed core React skeleton, safety score calculator, handover check-in timelines, and interactive vector telemetry grids.",
      icon: Code,
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10"
    },
    {
      phase: "Phase 2: Mobile Native",
      status: "In Progress",
      date: "Q3 2026",
      title: "PWA & Background Geofencing",
      desc: "Porting the web application to a Progressive Web App (PWA). Adding Android background services for automatic check-ins via geofencing.",
      icon: Cpu,
      color: "border-secondary text-secondary bg-secondary bg-opacity-10"
    },
    {
      phase: "Phase 3: Emergency Sync",
      status: "Planned",
      date: "Q4 2026",
      title: "State Police API Integration",
      desc: "Partnering with state police control centers. Integrating 112 emergency callback REST APIs to automatically dispatch local police vehicles.",
      icon: Milestone,
      color: "border-blue-500 text-blue-500 bg-blue-500/10"
    },
    {
      phase: "Phase 4: Low Network Mesh",
      status: "Planned",
      date: "Q1 2027",
      title: "Offline USSD & SMS Fallback",
      desc: "Enabling silent emergency alerts over SMS/USSD protocols if mobile data connectivity is lost. Automatic text compression scripts.",
      icon: Signal,
      color: "border-purple-500 text-purple-500 bg-purple-500/10"
    },
    {
      phase: "Phase 5: Voice Intelligence",
      status: "Planned",
      date: "Q2 2027",
      title: "Voice Recognition Trigger",
      desc: "On-device wake-word detection for key distress phrases (e.g. 'Help me' or 'Start record'). Silently triggers SOS without manual inputs.",
      icon: Mic,
      color: "border-accent-light text-accent-light bg-accent-light/10"
    }
  ]

  // Interactive Checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Interactive Leaflet & OpenStreetMap bindings", completed: true },
    { id: 2, text: "Rule-based commute delay alerts (>20%)", completed: true },
    { id: 3, text: "Hands-free shake detection simulation", completed: true },
    { id: 4, text: "Silent pattern lock gesture trigger", completed: true },
    { id: 5, text: "Progressive Web App package build", completed: false },
    { id: 6, text: "On-device ambient audio stream capture during SOS", completed: false },
    { id: 7, text: "Hardware volume hold listener mapping", completed: false }
  ])

  const toggleChecklist = (id) => {
    setChecklist((prev) => 
      prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      {/* Header */}
      <section className="max-w-3xl mx-auto text-center space-y-6 mb-16">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-secondary bg-opacity-10 text-secondary dark:text-secondary-dark uppercase tracking-wider font-outfit border border-secondary border-opacity-20">
          Future Development Roadmap
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-outfit text-appText leading-[1.15]">
          Scaling The Commuter <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-accent-light dark:from-primary-dark dark:via-secondary-dark dark:to-accent-dark">
            Guardian Network Grid
          </span>
        </h1>
        
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-medium">
          Check out our 12-month development timeline for expanding Travix AI from a hackathon mockup into a native, police-integrated offline mobile guardian.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns - Timeline */}
        <div className="lg:col-span-2 bg-appCard border border-borderLight rounded-2xl p-6 sm:p-8 shadow-premium dark:shadow-premiumDark">
          <h3 className="text-sm font-bold text-appText uppercase tracking-wider mb-8 flex items-center gap-2">
            <Compass className="text-secondary" />
            Milestones Timeline
          </h3>

          <div className="relative pl-8 space-y-8">
            {/* Connecting Line */}
            <div className="absolute top-2 bottom-2 left-[15px] w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

            {milestones.map((m, index) => {
              const Icon = m.icon
              const isCompleted = m.status === "Completed"
              const isInProgress = m.status === "In Progress"

              return (
                <div key={m.phase} className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 text-xs">
                  {/* Icon Node */}
                  <div className={`absolute -left-[27px] w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${
                    isCompleted 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : isInProgress 
                      ? "bg-white dark:bg-gray-800 border-secondary text-secondary scale-110" 
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400"
                  }`}>
                    {isCompleted ? <Check size={14} className="stroke-[3px]" /> : <Icon size={12} />}
                  </div>

                  <div className="pl-3 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                        isCompleted 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400" 
                          : isInProgress 
                          ? "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-20" 
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {m.phase}
                      </span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                        <Calendar size={10} />
                        {m.date}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-appText">{m.title}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                      {m.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column - Feature Checklist */}
        <div className="space-y-6">
          
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <div className="flex items-center gap-2 text-secondary pb-1 border-b border-borderLight">
              <ShieldCheck size={16} />
              <h4 className="text-xs font-extrabold uppercase tracking-wider font-outfit">
                Feature Progress logs
              </h4>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              Interact with our feature grid below to see what components have been built versus what is on the Q3 integration list.
            </p>

            <div className="space-y-2.5">
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer text-[11px] leading-snug group"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition shrink-0 ${
                    item.completed
                      ? "bg-secondary border-secondary text-white"
                      : "border-borderLight group-hover:border-gray-400 dark:group-hover:border-gray-600 bg-white dark:bg-gray-800"
                  }`}>
                    {item.completed && <Check size={10} className="stroke-[3px]" />}
                  </div>
                  <span className={`font-medium ${
                    item.completed 
                      ? "text-gray-400 line-through" 
                      : "text-appText group-hover:text-secondary transition-colors"
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scale vision card */}
          <div className="bg-gradient-to-br from-primary-light to-secondary dark:from-slate-900 dark:to-teal-950/20 border border-borderLight text-white rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">The SafeHer Scalability Core</h4>
            <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
              We leverage browser local storage to provide full caching features. This enables commuters to navigate routes and inspect safety heatmaps even with cellular networks dropping to 2G.
            </p>
            <div className="pt-1">
              <a 
                href="/dashboard"
                className="text-[10px] font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 transition inline-block"
              >
                Back To Dashboard ➔
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
