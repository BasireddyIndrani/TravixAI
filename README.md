# 🛡️ Travix AI | India's First AI-Powered Predictive Mobility Safety Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://travix-ai-two.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1-6474f2?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

Developed by **Team SafeHer**, **Travix AI** reimagines urban mobility safety in India. It is designed to act as an active, predictive safety layer that protects daily commuters transitioning through multi-modal transits (autos, buses, metros, and walking).

---

## 🔗 Live Deployment
🚀 **Try the platform live:** [https://travix-ai-two.vercel.app/](https://travix-ai-two.vercel.app/)

---

## 🌟 Core Features

### 1. 🤖 AI Guardian Mode
Keeps a digital watch over your commute using smart rule-based tracking, stationary timeouts, and arrival triggers to ensure you are safe throughout the trip.

### 2. 🔀 Multi-Modal Safe Handover Tracking
Visually tracks transitions between different transit types (Auto, Bus, Metro, and Walking). If handovers are delayed or abnormal pauses are detected, designated emergency contacts are instantly updated.

### 3. 🗺️ Safety Heatmap (OpenStreetMap)
Interactive map powered by Leaflet displaying crowdsourced, real-time safety scores using Green (Safe), Yellow (Caution), and Red (High Risk) zones.

### 4. 🧭 Route Intelligence
Calculates and compares travel duration against safety percentage index ratings to recommend the absolute safest path, rather than just the fastest path.

### 5. 🏆 Journey Trust Score & Gamification
Encourages safe commute habits. Earn badges and build your score (0–100) by checking in, reporting hazard updates, and completing routes along recommended safe paths.

### 6. 🚨 Voice-Free Silent SOS
Simulates emergency triggers including volume-key holds, device shake gestures, and hidden screen patterns to silently alert emergency contacts with live tracking information without drawing attention.

---

## 🛠️ Technology Stack

* **Frontend Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) (for fast HMR and optimized builds)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) for a modern, sleek interface with customizable dark/light themes.
* **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid page transitions and interactive micro-animations.
* **Mapping:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/) for interactive geographical safety routing and heatmaps.
* **Icons:** [Lucide React](https://lucide.dev/) for a clean, consistent UI icon set.
* **Routing:** [React Router DOM](https://reactrouter.com/) for single-page application navigation.

---

## 📂 Project Structure

```bash
TravixAI/
├── src/
│   ├── components/      # Reusable UI elements (Navbar, Footer, SafetyMap)
│   ├── context/         # React Context state providers (Theme, Journey safety states)
│   ├── pages/           # Platform views (Dashboard, Roadmap, SOS Center, Start Journey)
│   ├── main.jsx         # Application entry point
│   └── index.css        # Base styling and Tailwind configuration
├── vercel.json          # Routing configuration for Single Page App on Vercel
├── vite.config.js       # Vite build configurations
├── package.json         # Project dependencies and script tasks
└── README.md            # Platform documentation
```

---

## 💻 Local Setup & Installation

To run Travix AI locally on your system:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/BasireddyIndrani/TravixAI.git
   cd TravixAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open the URL shown in your terminal (usually `http://localhost:5173`).

---

## 🤝 Team Credits
Created by **Team SafeHer** for the 2026 hackathon, striving to make commuter transit safer for women and everyone across Indian cities.

### 👥 Team Members
* **Indrani**
* **Jahnavi**
* **Sree Sai Charan Teja**
