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
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'flat-border': '0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
