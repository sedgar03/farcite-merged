/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './frontend/src/**/*.{js,jsx,ts,tsx}',
    './frontend/public/index.html',
  ],
  prefix: "",
  theme: {
    // ... your theme configuration
  },
  plugins: [require("tailwindcss-animate")],
}