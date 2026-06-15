import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Shield, Mail, Lock, AlertCircle } from "lucide-react"

export default function LoginPage({ user, onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)
    
    // Simulate minor network delay
    setTimeout(() => {
      // Mock login
      const displayName = name || email.split("@")[0].split(".")[0].replace(/^\w/, (c) => c.toUpperCase())
      onLogin(email, displayName)
      setIsSubmitting(false)
      navigate("/dashboard")
    }, 800)
  }

  const handleGoogleSignIn = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      onLogin("aditi.rao@gmail.com", "Aditi Rao")
      setIsSubmitting(false)
      navigate("/dashboard")
    }, 600)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md bg-appCard border border-borderLight rounded-2xl p-8 shadow-premium dark:shadow-premiumDark transition-all duration-300">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-xl flex items-center justify-center text-secondary">
            <Shield size={24} />
          </div>
          <h1 className="text-2xl font-bold font-outfit text-appText">Welcome to Travix AI</h1>
          <p className="text-xs text-gray-500 max-w-[280px] mx-auto">
            Log in to protect your daily commute, select safe routes, and enable AI Guardian tracking.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider" htmlFor="name">
              Full Name (Optional for Demo)
            </label>
            <input
              id="name"
              type="text"
              placeholder="Aditi Rao"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="aditi.rao@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm outline-none text-appText focus:border-secondary transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-2 bg-primary text-white dark:bg-primary-dark dark:text-slate-900 font-bold rounded-xl text-sm hover:shadow-md hover:scale-[1.01] active:scale-98 transition disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-borderLight"></span>
          </div>
          <span className="relative bg-appCard px-3 text-[10px] text-gray-400 uppercase font-semibold">Or Continue With</span>
        </div>

        {/* Google Sign In Mock */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-borderLight bg-white dark:bg-gray-800 text-sm font-semibold text-appText hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.3-3.01 2.3l2.87 2.22c1.69-1.56 2.69-3.86 2.69-6.37z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.14 0-5.8-2.11-6.75-4.96l-4 3.09C3.18 20.3 7.22 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.25 14.29c-.25-.72-.39-1.49-.39-2.29s.14-1.57.39-2.29l-4-3.09C.46 8.24 0 10.06 0 12s.46 3.76 1.25 5.38l4-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.22 0 3.18 3.7 1.25 7.37l4 3.09c.95-2.85 3.61-4.96 6.75-4.96z"
            />
          </svg>
          Google Account
        </button>

        {/* Demo Tip */}
        <div className="mt-6 p-3 bg-secondary bg-opacity-5 rounded-xl border border-secondary border-opacity-10 text-[10px] text-gray-500">
          <p className="font-bold text-secondary-light dark:text-secondary-dark uppercase mb-0.5">Demo mode enabled</p>
          Enter any mock email and password, or click Google Account to sign in immediately.
        </div>
      </div>
    </div>
  )
}
