/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#03030c',
          dark: '#070716',
          darker: '#020208',
          gray: '#0b0c1e',
          border: 'rgba(255,255,255,0.08)',
          text: '#f8fafc',
          muted: '#94a3b8'
        },
        comet: {
          cream: '#FAF9F6',
          dark: '#020202',
          teal: '#1D91A1',
          text: '#131313',
          border: '#E8E8E3',
          muted: '#8A8A85'
        },
        neon: {
          cyan: '#38d9f5',
          orange: '#f47c54',
          purple: '#8b5cf6',
          teal: '#2dd4bf',
        }
      },
      fontFamily: {
        serif: ['"Outfit"', 'sans-serif'],
        sans: ['"Outfit"', 'sans-serif'],
        hero: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.15)',
        'glow-orange': '0 0 20px rgba(255, 91, 34, 0.15)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
