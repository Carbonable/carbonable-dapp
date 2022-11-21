/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        americana: [ "americana", "sans-serif" ],
        trash: [ "trash", "sans-serif"],
        inter: [ "Inter", "sans-serif"]
      },
      colors: {
        beaige: '#EFECEA',
        green: "#0AF2AD",
        lightblue: "#AAC6FD",
        grey: "#787675",
        footerBg: "#272727"
      },
      backgroundImage: {
        'green-blue': 'linear-gradient(270deg, #A8C4EF 39.58%, #0AF2AD 100%);',
        'navigation': 'linear-gradient(90.2deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.13) 0.01%, rgba(255, 255, 255, 0.2) 0.02%, rgba(255, 255, 255, 0.1) 43.23%, rgba(255, 255, 255, 0) 70.83%, rgba(255, 255, 255, 0.24) 100%);',
        'nav-selected': 'linear-gradient(270deg, #A8C4EF 39.58%, #0AF2AD 100%);',
        'launchpad': "url('/assets/images/backgrounds/launchpad.png')",
        'header': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);'
      }
    }
  },
  plugins: [require("tailwindcss-radix")()],
}