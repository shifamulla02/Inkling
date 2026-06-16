/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        alabaster: {
          DEFAULT: '#d8e2dc', 50: '#f8f9f9', 100: '#eef2f0', 200: '#e1e9e4', 300: '#d8e2dc', 400: '#bacfc2', 500: '#9cbba8', 600: '#7fa68f', 700: '#648b74', 800: '#52725f', 900: '#435d4e'
        },
        powder: {
          DEFAULT: '#ffe5d9', 50: '#fffcfb', 100: '#fff5f0', 200: '#ffede4', 300: '#ffe5d9', 400: '#ffd0bc', 500: '#ffbc9f', 600: '#ffa782', 700: '#ff8f61', 800: '#e66c3c', 900: '#bd542a'
        },
        pink: {
          DEFAULT: '#ffcad4', 50: '#fff5f7', 100: '#ffe8ec', 200: '#ffdce2', 300: '#ffcad4', 400: '#ffb3c1', 500: '#ff98a9', 600: '#ff778e', 700: '#ff5471', 800: '#e63554', 900: '#bd2440'
        },
        cherry: {
          DEFAULT: '#f4acb7', 50: '#fdf4f5', 100: '#fbe4e8', 200: '#f8cdd5', 300: '#f4acb7', 400: '#ef8a9a', 500: '#e96378', 600: '#e03e57', 700: '#c82641', 800: '#a71c33', 900: '#8c1629'
        },
        mauve: {
          DEFAULT: '#9d8189', 50: '#f6f4f5', 100: '#ece7e9', 200: '#dcd1d5', 300: '#c5b4b9', 400: '#9d8189', 500: '#846971', 600: '#695058', 700: '#554147', 800: '#47363b', 900: '#3e2f33', 950: '#251b1e'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(244, 172, 183, 0.4)',
        'card': '0 4px 20px rgba(157, 129, 137, 0.05)',
        'card-hover': '0 10px 30px rgba(157, 129, 137, 0.1)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #f4acb7 0%, #ffcad4 100%)',
        'hero-mesh': `
          radial-gradient(ellipse at 20% 50%, rgba(244,172,183,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(255,202,212,0.2) 0%, transparent 40%),
          radial-gradient(ellipse at 60% 80%, rgba(216,226,220,0.3) 0%, transparent 50%)
        `,
      },
      animation: {
        'ink-drop': 'inkDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'progress-bar': 'progressBar 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        inkDrop: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '60%': { transform: 'scale(1.05) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)' },
        },
        progressBar: {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
