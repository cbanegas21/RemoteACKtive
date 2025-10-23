/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0b1020",
        panel: {
          DEFAULT: "#0d0d0d",
          light: "#f8f9fa",
        },
      },
      textColor: {
        primary: {
          DEFAULT: "#1e293b", // light mode
          dark: "#ffffff",    // dark mode
        },
        secondary: {
          DEFAULT: "#475569", // light mode
          dark: "#e2e8f0",    // dark mode
        },
        tertiary: {
          DEFAULT: "#64748b", // light mode
          dark: "#94a3b8",    // dark mode
        },
      },
    },
  },
  plugins: [],
};