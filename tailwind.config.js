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
          cyan: "#3B9BA5",
          teal: "#3B9BA5",
          green: "#2A6B4F",
          navy: "#0A2540",
          gold: "#F5A623",
          orange: "#F5A623",
        },
        background: {
          light: "#F7FAFB",
          dark: "#0F1419",
          darkCard: "#1E2430",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B9BA5 0%, #2A6B4F 100%)',
        'gradient-hero': 'linear-gradient(135deg, #3B9BA5 0%, #2A6B4F 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A1628 0%, #0F1419 100%)',
      },
    },
  },
  plugins: [],
};