/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: "#57C5CF",
          teal: "#57C5CF",
          green: "#378B57",
          navy: "#0A2540",
          gold: "#F5A623",
          blue: "#4DD0E1",
        },
        background: {
          light: "#F7FAFB",
          dark: "#0F1926",
          darkCard: "#1E2430",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #248B93 0%, #1A5538 100%)',
        'gradient-hero': 'linear-gradient(135deg, #248B93 0%, #1A5538 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A1628 0%, #0F1926 100%)',
      },
    },
  },
  plugins: [],
};