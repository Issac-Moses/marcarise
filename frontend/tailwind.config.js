/** @type {import('tailwindcss').Config} */
const brand = {
  50: "#f8f5ff",
  100: "#f0e9ff",
  200: "#e0d2ff",
  300: "#c6adfe",
  400: "#a97bf9",
  500: "#8f3bf5",
  600: "#7c0ce7",
  700: "#6a0cc4",
  800: "#560b9e",
  900: "#440a7a",
  950: "#2c0559",
};

export default {
   darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#030014", // Near black for depth
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#7c0ce7",
          glow: "rgba(124, 12, 231, 0.5)",
        },
        accent: "#8f3bf5",
        blue: brand,
        indigo: brand,
        cyan: brand,
        sky: brand,
        violet: brand,
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
};