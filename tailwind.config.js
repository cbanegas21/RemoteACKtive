/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "!./app/lib/**",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      'none': '0px',
      'sm':   '0px',
      DEFAULT: '0px',
      'md':   '0px',
      'lg':   '0px',
      'xl':   '0px',
      '2xl':  '0px',
      '3xl':  '0px',
      'full': '0px',
    },
    extend: {
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
      },
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        shimmer: "shimmer 3s linear infinite",
        scanline: "scanline 8s linear infinite",
        aurora: "aurora 60s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          cyan: "#C3EDD8",
          teal: "#C3EDD8",
          green: "#C3EDD8",
          navy: "#0A2540",
          gold: "#F5A623",
          orange: "#F5A623",
          blue: "#4DD0E1",
        },
        background: {
          light: "#F7FAFB",
          dark: "#0D1612",
          darkCard: "#121F18",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #248B93 0%, #1A5538 100%)',
        'gradient-hero': 'linear-gradient(to right, #0f3443, #34e89e)',
        'gradient-dark': 'linear-gradient(180deg, #060C09 0%, #0D1612 100%)',
        'gradient-ocean': 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        'gradient-forest': 'linear-gradient(to right, #1f4037, #99f2c8)',
        'gradient-deep-teal': 'linear-gradient(to right, #003d4d, #00c996)',
      },
    },
  },
  plugins: [],
};