/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'finance-dark': '#0f172a',
        'finance-accent': '#3b82f6',
        'finance-success': '#10b981',
        'finance-danger': '#ef4444',
      },
    },
  },
  plugins: [],
}
