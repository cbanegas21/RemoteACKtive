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
        },
        background: {
          light: "#F7FAFB",
          dark: "#0A2540",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #57C5CF 0%, #378B57 100%)',
        'gradient-hero': 'linear-gradient(135deg, #57C5CF 0%, #378B57 100%)',
      },
    },
  },
  plugins: [],
};