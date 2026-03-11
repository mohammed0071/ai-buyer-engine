import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0F",
        secondary: "#1A1A2E",
        accent: "#00D4AA",
        "accent-purple": "#7B2CBF",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0B0",
        surface: "#12121A",
      },
      fontFamily: {
        clash: ["Clash Display", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-reverse": "floatReverse 8s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlowTW 2s ease-in-out infinite",
        "border-rotate": "borderRotateTW 4s linear infinite",
        "particle-float": "particleFloat 20s linear infinite",
        "shimmer": "shimmerBG 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(10px) rotate(-1deg)" },
          "66%": { transform: "translateY(-5px) rotate(1deg)" },
        },
        pulseGlowTW: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0,212,170,0.3), 0 0 20px rgba(0,212,170,0.15)" },
          "50%": { boxShadow: "0 0 20px rgba(0,212,170,0.5), 0 0 40px rgba(0,212,170,0.25), 0 0 60px rgba(0,212,170,0.1)" },
        },
        borderRotateTW: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        particleFloat: {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) translateX(100px)", opacity: "0" },
        },
        shimmerBG: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
