/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#0A2342",
          dark: "#60A5FA",
          DEFAULT: "var(--color-primary)",
        },
        secondary: {
          light: "#00BFA5",
          dark: "#2DD4BF",
          DEFAULT: "var(--color-secondary)",
        },
        accent: {
          light: "#FF8C42",
          dark: "#FB923C",
          DEFAULT: "var(--color-accent)",
        },
        appBg: "var(--color-bg)",
        appCard: "var(--color-card)",
        appText: "var(--color-text)",
        borderLight: "var(--color-border)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        premium: "0 4px 20px -2px rgba(10, 35, 66, 0.05), 0 2px 8px -1px rgba(10, 35, 66, 0.03)",
        premiumDark: "0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 8px -1px rgba(0, 0, 0, 0.2)",
      }
    },
  },
  plugins: [],
}
