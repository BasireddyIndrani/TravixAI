import React from "react"
import { motion } from "framer-motion"
import { Shield, Sparkles, Award, Code, Lightbulb, Users, ArrowRight, Heart } from "lucide-react"

export default function TeamSafeHer() {
  const members = [
    {
      name: "Aditi Rao",
      role: "Lead Product Architect",
      bio: "Focuses on user journey flows and mobile telemetry rule-based algorithms. Championing safe commutes in tech hubs.",
      initials: "AR"
    },
    {
      name: "Priya Sharma",
      role: "User Research Lead",
      bio: "Conducts field research on urban dark spots, street lighting density, and silent emergency gestures in Hyderabad.",
      initials: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "System Integration Lead",
      bio: "Designs offline messaging failovers, webhook listeners, and the core Leaflet telemetry mapping interfaces.",
      initials: "RK"
    }
  ]

  const values = [
    {
      title: "Zero Hardware Dependency",
      desc: "Designed to operate entirely on consumer smartphones without expensive external IoT or hardware nodes.",
      icon: Shield
    },
    {
      title: "Predictive Route Ratings",
      desc: "Scores routes using active lighting metrics, CCTV logs, and historic check-ins, warning users prior to step boardings.",
      icon: Sparkles
    },
    {
      title: "Multi-Modal Handover",
      desc: "Tracks step-by-step transitions (Auto ➔ Bus ➔ Metro ➔ Walk), alerting contacts if checking in is delayed.",
      icon: Award
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6 mb-16">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-secondary bg-opacity-10 text-secondary dark:text-secondary-dark uppercase tracking-wider font-outfit border border-secondary border-opacity-20">
          Meet Team SafeHer
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-outfit text-appText leading-[1.15]">
          Empowering India's Commuters Through <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-secondary to-accent-light dark:from-primary-dark dark:via-secondary-dark dark:to-accent-dark">
            AI-Driven Telemetry Safety
          </span>
        </h1>
        
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-medium">
          Travix AI is built for the India Commute Safety 2026 Hackathon. Our vision is simple: ensure no commuter drops off the safety tracking grid.
        </p>
      </section>

      {/* Target Problem Deck */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20 bg-appCard border border-borderLight rounded-2xl p-6 sm:p-8 shadow-premium dark:shadow-premiumDark">
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-accent-light uppercase tracking-wider">The Target Problem</span>
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-appText">
            The Danger of "Blind" Commutes
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            Daily urban commutes in Indian cities consist of multi-modal segments: hailing autos, boarding buses, and walking dark alleys. Traditional emergency safety systems fail because:
          </p>
          <ul className="text-xs text-gray-400 space-y-2 pl-4 list-disc font-medium">
            <li>They lack granular segment monitoring, tracking only start-to-end positions.</li>
            <li>Panic alerts require screen activations or voice commands, which are impossible in high-stress confrontations.</li>
            <li>No early warning maps exist that compare routes on actual lighting and CCTV availability.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-tr from-primary-light/5 to-secondary/5 dark:from-slate-900 dark:to-teal-950/20 border border-borderLight rounded-2xl p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Heart size={160} className="text-secondary" />
          </div>
          
          <h4 className="text-xs font-bold text-appText uppercase tracking-wider">The SafeHer Solution</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
            Travix AI enforces automated "handover checks" at each leg transition. If a user does not register complete boardings (e.g. stepping off the metro to walk home), the system alerts emergency contacts with active live coordinates, preempting distress calls.
          </p>
          
          <div className="flex gap-2 pt-2">
            <span className="text-[10px] font-bold text-secondary flex items-center gap-1">
              Read Mission Statement <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </section>

      {/* Core Values / Pillar Cards */}
      <section className="mb-20 space-y-10">
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-2">PRODUCT ARCHITECTURE PILLARS</h3>
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-appText">What Makes Travix AI Different?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div 
                key={v.title}
                className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark hover:border-secondary/30 transition duration-300"
              >
                <div className="p-3 bg-white dark:bg-gray-800 border border-borderLight rounded-xl w-fit text-secondary shadow-sm">
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-bold font-outfit text-appText mt-4 mb-2">{v.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="space-y-10">
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-2">THE PROJECT CREATORS</h3>
          <h2 className="text-xl sm:text-2xl font-bold font-outfit text-appText">Meet Our Design Grid</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {members.map((m) => (
            <div 
              key={m.name}
              className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark flex flex-col items-center text-center space-y-4 hover:scale-[1.01] transition duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-secondary bg-opacity-10 text-secondary font-bold text-xl flex items-center justify-center border border-secondary border-opacity-25">
                {m.initials}
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-appText">{m.name}</h4>
                <span className="text-[10px] font-bold text-secondary uppercase mt-0.5 block">{m.role}</span>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
