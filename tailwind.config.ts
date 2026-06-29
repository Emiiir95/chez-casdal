import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Palette dérivée du logo Chez Casdal (orange flamme sur fond noir charbon).
 * Modifiez les valeurs ci-dessous pour ajuster l'identité visuelle.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Les effets `hover:` (cartes qui se lèvent, scale, etc.) ne s'appliquent
  // que sur les appareils avec un vrai pointeur. Évite le hover « collé »
  // après un tap sur mobile.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Orange flamme — couleur dominante du logo
        flamme: {
          50: "#fff5ec",
          100: "#ffe6d1",
          200: "#ffc89c",
          300: "#ffa463",
          400: "#ff8336",
          500: "#ff6b1a", // orange principal
          600: "#f15407",
          700: "#c63f06",
          800: "#9b330d",
          900: "#7d2c0f",
        },
        // Noir charbon — fond du logo et du menu
        charbon: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#a8a8a8",
          400: "#6f6f6f",
          500: "#4a4a4a",
          600: "#2e2e2e",
          700: "#1f1f1f",
          800: "#141414",
          900: "#0a0a0a",
        },
        // Crème chaude pour les fonds clairs
        creme: {
          50: "#fffaf3",
          100: "#fff3e2",
          200: "#ffe8c8",
        },
        // Or pour les accents (prix, badges)
        or: {
          400: "#f5b740",
          500: "#e9a521",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-bebas)", "var(--font-inter)", "sans-serif"],
        display: ["var(--font-bebas)", "sans-serif"],
        script: ["var(--font-pacifico)", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        flame: "0 18px 50px -18px rgba(255, 107, 26, 0.55)",
        deep: "0 24px 60px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "flame-gradient":
          "linear-gradient(135deg, #ff6b1a 0%, #ff8336 50%, #f5b740 100%)",
        "charbon-gradient":
          "linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "flame-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "flame-pulse": "flame-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
