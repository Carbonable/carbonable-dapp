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
        white: '#EBECF0',
        black: '#030305',
        neutral: {
          100: '#D0D1D6',
          200: '#A8ABB3',
          300: '#878A94',
          400: '#555861',
          500: '#363840',
          600: '#2B2E36',
          700: '#1F2128',
          800: '#13151C',
          900: '#0B0D13',
        },
        primary: {
          DEFAULT: '#0AF2AD',
          dark: '#087353',
          light: '#A9FCE4'
        },
        blue: {
          DEFAULT: '#9EBAF0',
          dark: '#334566',
          light: '#C5D7FA'
        },
        opacityLight: {
          5: 'rgba(208, 209, 214, 0.05)'
        },
        beaige: '#EFECEA',
        green: "#0AF2AD",
        lightblue: "#AAC6FD",
        grey: "#787675",
        footerBg: "#272727"
      },
      backgroundImage: {
        'primary': 'linear-gradient(180deg, #0AF7B1 0%, #09AD7C 44.27%, #087051 100%)',
        'blue': 'linear-gradient(180deg, #A1BCF0 0%, #7B90BA 40.1%, #394D73 100%)',
        'brand': 'linear-gradient(270deg, #A8C4EF 39.58%, #0AF2AD 100%)',
        'light-5': 'rgba(208, 209, 214, 0.05)',
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