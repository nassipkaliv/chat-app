/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'tg-bg': '#000',         
        'tg-elevated': '#1c1c1d;',      
        'tg-border': '#545458',     
      },
    },
  },
  plugins: [],
}