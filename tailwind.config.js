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
        'colombia': {
          'yellow': '#FFED00',
          'blue': '#003893',
          'red': '#CE1126',
          'yellow-light': '#FFF75A',
          'blue-light': '#4A6FA5',
          'red-light': '#E53E3E',
        }
      },
      backgroundImage: {
        'colombia-gradient': 'linear-gradient(135deg, #FFED00 0%, #003893 50%, #CE1126 100%)',
        'colombia-subtle': 'linear-gradient(135deg, #FFF75A 0%, #4A6FA5 50%, #E53E3E 100%)',
        'colombia-vertical': 'linear-gradient(180deg, #FFED00 33%, #003893 33% 66%, #CE1126 66%)',
        'colombia-pattern': 'repeating-linear-gradient(45deg, #FFED00 0px, #FFED00 10px, #003893 10px, #003893 20px, #CE1126 20px, #CE1126 30px)',
      },
      animation: {
        'colombia-pulse': 'colombia-pulse 3s ease-in-out infinite',
        'colombia-wave': 'colombia-wave 4s ease-in-out infinite',
      },
      keyframes: {
        'colombia-pulse': {
          '0%, 100%': { 
            background: 'linear-gradient(135deg, #FFED00 0%, #003893 50%, #CE1126 100%)',
            transform: 'scale(1)'
          },
          '50%': { 
            background: 'linear-gradient(135deg, #FFF75A 0%, #4A6FA5 50%, #E53E3E 100%)',
            transform: 'scale(1.02)'
          },
        },
        'colombia-wave': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
    },
  },
  plugins: [],
}