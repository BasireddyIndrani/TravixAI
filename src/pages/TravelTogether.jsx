import React, { useState } from "react"
import { useJourney } from "../context/JourneyContext"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Share2, 
  Check, 
  Smartphone, 
  AlertCircle, 
  Heart, 
  ShieldCheck, 
  Copy, 
  ExternalLink 
} from "lucide-react"

export default function TravelTogether() {
  const { contacts, addContact, removeContact, activeJourney } = useJourney()
  
  // Local form state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [relationship, setRelationship] = useState("Friend")
  
  // Custom states
  const [copiedLink, setCopiedLink] = useState(false)
  const [shareSimLog, setShareSimLog] = useState("")

  const handleAddContact = (e) => {
    e.preventDefault()
    if (!name || !phone) return
    
    // Add contact
    addContact(name, phone, relationship)
    setName("")
    setPhone("")
    setRelationship("Friend")
  }

  const handleCopyLink = () => {
    const mockLink = `https://travix.ai/track/journey-active-${Date.now()}`
    navigator.clipboard.writeText(mockLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleSimulateShare = (channel, contactName) => {
    setShareSimLog(`[SIMULATION] Broadcasted active tracking token via ${channel.toUpperCase()} to ${contactName} successfully!`)
    setTimeout(() => {
      setShareSimLog("")
    }, 4000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-outfit text-appText">Travel Together</h1>
        <p className="text-xs text-gray-500 mt-1">
          Add trusted contacts to your safety grid. When tracking is active, they will receive SMS notifications and can watch your live telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Add Guardian & Guardian Grid */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Share Status Alert */}
          {activeJourney ? (
            <div className="bg-secondary bg-opacity-5 border border-secondary border-opacity-20 rounded-2xl p-5 shadow-premium dark:shadow-premiumDark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <ShieldCheck size={10} />
                  LIVE COMMUTE ACTIVE
                </span>
                <h3 className="text-sm font-bold text-appText mt-1.5">
                  Route: {activeJourney.source} ➔ {activeJourney.destination}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Let your guardians monitor your multi-modal transitions.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  className="bg-white dark:bg-gray-800 border border-borderLight text-appText font-bold text-xs px-4 py-2.5 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition flex items-center gap-1.5 shadow-sm"
                >
                  {copiedLink ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  {copiedLink ? "Link Copied" : "Copy Live Link"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-xl text-gray-500">
                <AlertCircle size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-appText">No Active Journey Broadcast</h4>
                <p className="text-[10px] text-gray-400">
                  Start a journey via the commute console to enable automated GPS coordinate sharing.
                </p>
              </div>
            </div>
          )}

          {/* Share Simulation Notice */}
          <AnimatePresence>
            {shareSimLog && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 text-xs p-3.5 rounded-xl font-semibold flex items-center gap-2"
              >
                <Smartphone size={16} className="animate-bounce" />
                <span>{shareSimLog}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trusted Contacts Grid */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark">
            <h3 className="text-sm font-bold text-appText uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users size={18} className="text-secondary" />
              Your Trusted Guardians ({contacts.length})
            </h3>

            {contacts.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-borderLight rounded-xl">
                <Users className="mx-auto w-10 h-10 text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">No Trusted Contacts Registered</p>
                <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto mt-1">
                  Add family members or friends who should receive safety warnings and transition alerts.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((c) => (
                  <div 
                    key={c.phone} 
                    className="border border-borderLight bg-white dark:bg-gray-800/40 p-4 rounded-xl flex items-start justify-between hover:border-gray-300 dark:hover:border-gray-700 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary bg-opacity-10 text-secondary flex items-center justify-center font-bold text-xs">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-appText">{c.name}</h4>
                          <span className="text-[10px] font-bold text-gray-400">{c.relationship}</span>
                        </div>
                      </div>
                      <p className="text-[11px] font-semibold text-gray-500 mt-2">{c.phone}</p>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <button
                        onClick={() => removeContact(c.phone)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                        title="Remove Contact"
                      >
                        <Trash2 size={14} />
                      </button>

                      {activeJourney && (
                        <button
                          onClick={() => handleSimulateShare("sms", c.name)}
                          className="text-[9px] font-bold text-secondary bg-secondary bg-opacity-5 hover:bg-opacity-10 border border-secondary border-opacity-20 px-2 py-1 rounded"
                        >
                          Simulate SMS
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Add Contact Form */}
        <div className="space-y-6">
          <div className="bg-appCard border border-borderLight rounded-2xl p-6 shadow-premium dark:shadow-premiumDark space-y-4">
            <div className="flex items-center gap-2 text-secondary pb-1 border-b border-borderLight">
              <UserPlus size={16} />
              <h4 className="text-xs font-extrabold uppercase tracking-wider font-outfit">
                Add New Guardian
              </h4>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition font-medium"
                >
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other Guardian</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white dark:bg-primary-dark dark:text-slate-900 font-bold rounded-xl text-xs hover:shadow hover:scale-[1.005] transition"
              >
                Register Contact
              </button>
            </form>
          </div>

          {/* Secure Grid Pitch */}
          <div className="bg-appCard border border-borderLight rounded-2xl p-5 shadow-premium dark:shadow-premiumDark space-y-3 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 text-secondary/5 pointer-events-none">
              <Heart size={100} className="fill-current" />
            </div>

            <h4 className="text-xs font-bold text-appText uppercase tracking-wider">Safety Grid Architecture</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              We leverage local browser telemetry to identify stationary situations or route deviations. 
              Upon identifying anomalies:
            </p>
            <ul className="text-[10px] text-gray-400 space-y-1.5 pl-4 list-disc font-medium">
              <li>Automatic ping checks are sent directly to your screen.</li>
              <li>If unanswered within 60s, a secure webhook payload is sent to emergency contacts.</li>
              <li>Real-time telemetry link provides GPS grid coordinates without needing heavy background app installs.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
