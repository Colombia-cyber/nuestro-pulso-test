/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        colombia: {
          yellow: '#FFD700',
          blue: '#0033A0',
          red: '#CE1126',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
        }
      },
      backgroundImage: {
        'colombia-gradient': 'linear-gradient(135deg, #FFD700 0%, #0033A0 50%, #CE1126 100%)',
        'colombia-flag': 'linear-gradient(to bottom, #FFD700 33.33%, #0033A0 33.33%, #0033A0 66.66%, #CE1126 66.66%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'flag-wave': 'flag-wave 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}