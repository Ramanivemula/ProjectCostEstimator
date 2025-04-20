/** @type {import('tailwindcss').Config} */
export default {
  server:{
    proxy:{
      '/api': 'http://localhost:3000'
    }
  },
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

