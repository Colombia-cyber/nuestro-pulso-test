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
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Colombian flag inspired colors - Enhanced
        colombia: {
          yellow: '#FFCE00',
          blue: '#003087',
          red: '#C8102E',
          // Extended palette with more sophistication
          'yellow-50': '#FFFDF0',
          'yellow-100': '#FFF4CC',
          'yellow-200': '#FFE999',
          'yellow-300': '#FFDD66',
          'yellow-400': '#FFD133',
          'yellow-500': '#FFCE00',
          'yellow-600': '#E6B800',
          'yellow-700': '#CC9900',
          'yellow-800': '#B37A00',
          'yellow-900': '#995C00',
          'blue-50': '#F0F7FF',
          'blue-100': '#CCE0FF',
          'blue-200': '#99C2FF',
          'blue-300': '#66A3FF',
          'blue-400': '#3385FF',
          'blue-500': '#003087',
          'blue-600': '#002B7A',
          'blue-700': '#00266E',
          'blue-800': '#002261',
          'blue-900': '#001D54',
          'red-50': '#FFF5F5',
          'red-100': '#FFE6EA',
          'red-200': '#FFCCD4',
          'red-300': '#FFB3BF',
          'red-400': '#FF99AA',
          'red-500': '#C8102E',
          'red-600': '#B50E29',
          'red-700': '#A00D26',
          'red-800': '#8C0B22',
          'red-900': '#78091E',
        },
        // Enhanced neutral palette with more depth
        gray: {
          25: '#FDFDFD',
          50: '#F9FAFB',
          75: '#F6F7F8',
          100: '#F3F4F6',
          125: '#F0F1F3',
          150: '#EAEAEC',
          200: '#E5E7EB',
          250: '#E1E4E8',
          300: '#D1D5DB',
          350: '#C7CCD1',
          400: '#9CA3AF',
          450: '#8B92A3',
          500: '#6B7280',
          550: '#5D646F',
          600: '#4B5563',
          650: '#424954',
          700: '#374151',
          750: '#323844',
          800: '#1F2937',
          825: '#1C2532',
          850: '#1A202C',
          875: '#171C27',
          900: '#111827',
          925: '#0E1419',
          950: '#0F1419',
          975: '#0A0E14',
        },
        // Enhanced perspective colors with more nuance
        perspective: {
          balanced: '#10B981', // Emerald
          'balanced-light': '#6EE7B7',
          'balanced-dark': '#047857',
          progressive: '#3B82F6', // Blue
          'progressive-light': '#93C5FD',
          'progressive-dark': '#1E40AF',
          conservative: '#EF4444', // Red
          'conservative-light': '#FCA5A5',
          'conservative-dark': '#B91C1C',
          neutral: '#6B7280', // Gray
          'neutral-light': '#D1D5DB',
          'neutral-dark': '#374151',
        },
        // Enhanced accent system
        accent: {
          primary: '#3B82F6',
          'primary-light': '#93C5FD',
          'primary-dark': '#1E40AF',
          secondary: '#10B981',
          'secondary-light': '#6EE7B7',
          'secondary-dark': '#047857',
          tertiary: '#8B5CF6',
          'tertiary-light': '#C4B5FD',
          'tertiary-dark': '#5B21B6',
          warning: '#F59E0B',
          'warning-light': '#FCD34D',
          'warning-dark': '#D97706',
          error: '#EF4444',
          'error-light': '#FCA5A5',
          'error-dark': '#B91C1C',
          success: '#10B981',
          'success-light': '#6EE7B7',
          'success-dark': '#047857',
          info: '#06B6D4',
          'info-light': '#67E8F9',
          'info-dark': '#0891B2',
        },
        // Premium glass and surface colors
        surface: {
          glass: 'rgba(255, 255, 255, 0.1)',
          'glass-strong': 'rgba(255, 255, 255, 0.2)',
          'glass-light': 'rgba(255, 255, 255, 0.05)',
          overlay: 'rgba(0, 0, 0, 0.4)',
          'overlay-light': 'rgba(0, 0, 0, 0.2)',
          'overlay-strong': 'rgba(0, 0, 0, 0.6)',
        }
      },
      backgroundImage: {
        'gradient-colombia': 'linear-gradient(135deg, #FFCE00 0%, #003087 50%, #C8102E 100%)',
        'gradient-colombia-soft': 'linear-gradient(135deg, #FFF4CC 0%, #CCE0FF 50%, #FFE6EA 100%)',
        'gradient-colombia-premium': 'linear-gradient(135deg, #FFCE00 0%, #FFD133 25%, #003087 50%, #0066FF 75%, #C8102E 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-news': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-premium': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-modern': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-elegant': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'fade-in-left': 'fadeInLeft 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'bounce-gentle': 'bounceGentle 3s infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'floatDelayed 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient': 'gradient 15s ease infinite',
        'gradient-fast': 'gradientFast 8s ease infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-bounce': 'scaleBounce 0.4s ease-out',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        floatDelayed: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        gradientFast: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleBounce: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' }
        }
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 20px 50px -10px rgba(0, 0, 0, 0.1)',
        'colombia': '0 10px 40px -10px rgba(255, 206, 0, 0.3)',
        'colombia-strong': '0 15px 50px -10px rgba(255, 206, 0, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-strong': '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
        'news-card': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'news-card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.15)',
        'floating': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        'floating-lg': '0 25px 60px -15px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '115': '1.15',
        '120': '1.2',
        '125': '1.25',
      },
      blur: {
        '4xl': '72px',
        '5xl': '96px',
      }
    },
  },
  plugins: [],
}