/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        comet: {
          cream: '#FAF9F6',
          dark: '#020202',
          teal: '#1D91A1',
          text: '#131313',
          border: '#E8E8E3',
          muted: '#8A8A85'
        }
      },
      fontFamily: {
        serif: ['"Outfit"', 'sans-serif'],
        sans: ['"Outfit"', 'sans-serif'],
        hero: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'dark-glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
