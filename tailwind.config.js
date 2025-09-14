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
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        colombian: {
          yellow: '#FCDC00',
          'yellow-light': '#FEE55C',
          'yellow-dark': '#E6C800',
          blue: '#003A70',
          'blue-light': '#1E5A96',
          'blue-dark': '#002147',
          red: '#CE1126',
          'red-light': '#E63946',
          'red-dark': '#A01E32',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.25)',
          'white-strong': 'rgba(255, 255, 255, 0.4)',
          'white-light': 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.25)',
          'dark-strong': 'rgba(0, 0, 0, 0.4)',
          'dark-light': 'rgba(0, 0, 0, 0.1)',
        }
      },
      backgroundImage: {
        'colombian-gradient': 'linear-gradient(135deg, #FCDC00 0%, #003A70 50%, #CE1126 100%)',
        'colombian-gradient-reverse': 'linear-gradient(135deg, #CE1126 0%, #003A70 50%, #FCDC00 100%)',
        'hero-colombia': 'linear-gradient(rgba(0,58,112,0.7), rgba(206,17,38,0.5)), url("/hero-colombia.jpg")',
        'glass-effect': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(252, 220, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 58, 112, 0.3)',
        'glow-red': '0 0 20px rgba(206, 17, 38, 0.3)',
      }
    },
  },
  plugins: [],
}