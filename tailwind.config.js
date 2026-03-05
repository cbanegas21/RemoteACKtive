/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          cyan: "#57C5CF",
          teal: "#57C5CF",
          green: "#378B57",
          navy: "#0A2540",
          gold: "#F5A623",
          orange: "#F5A623",
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
        'gradient-hero': 'linear-gradient(to right, #0f3443, #34e89e)',
        'gradient-dark': 'linear-gradient(180deg, #0A1628 0%, #0F1926 100%)',
        'gradient-ocean': 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        'gradient-forest': 'linear-gradient(to right, #1f4037, #99f2c8)',
        'gradient-deep-teal': 'linear-gradient(to right, #003d4d, #00c996)',
      },
    },
  },
  plugins: [],
};