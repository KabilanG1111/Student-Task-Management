/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // black background
        surface: '#18181b',    // surface color for cards
        primary: {
          500: '#a855f7',      // purple accent
          600: '#9333ea',
          700: '#7e22ce',
        }
      }
    },
  },
  plugins: [],
}
