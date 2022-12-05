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
        'header': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%);'
      },
      animation: {
        'blur-1': 'blur-text 1.4s 0.2s infinite linear alternate',
        'blur-2': 'blur-text 1.4s 0.4s infinite linear alternate',
        'blur-3': 'blur-text 1.4s 0.6s infinite linear alternate',
        'blur-4': 'blur-text 1.4s 0.8s infinite linear alternate',
        'blur-5': 'blur-text 1.4s 1s infinite linear alternate',
        'blur-6': 'blur-text 1.4s 1.2s infinite linear alternate',
        'blur-7': 'blur-text 1.4s 1.4s infinite linear alternate'
      },
      keyframes: {
        'blur-text': {
          '0%': {filter: 'blur(0px)'},
          '100%': {filter: 'blur(4px)'}
        }
      }
    }
  },
  plugins: [require("tailwindcss-radix")()],
}