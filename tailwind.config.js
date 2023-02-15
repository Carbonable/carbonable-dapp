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
        inter: [ "Inter", "sans-serif"],
        montserrat: [ "Montserrat", "sans-serif"],
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
        greenish: {
          100: '#DDF6EB',
          200: '#BAEED7',
          300: '#75D9AD',
          400: '#47C48E',
          500: '#29A46F',
          600: '#22875B',
          700: '#1B6B49',
          800: '#145136',
          900: '#0E3725',
          1000: '#082015',
        },
        primary: {
          DEFAULT: '#0AF2AD',
          dark: '#087353',
          light: '#A9FCE4'
        },
        orange: {
          DEFAULT: '#CFBD70',
          dark: '#877B44',
          light: '#C5D7FA'
        },
        blue: {
          DEFAULT: '#9EBAF0',
          dark: '#334566',
          light: '#D9CC96'
        },
        opacityLight: {
          5: 'rgba(208, 209, 214, 0.05)'
        },
        opacityDark: {
          40: 'rgba(11, 13, 19, 0.4)'
        },
        undeposited: '#DA7575',
        undepositedBorder: 'rgba(218, 117, 117, 0.3)',
        beaige: '#EFECEA',
        green: "#0AF2AD",
        lightblue: "#AAC6FD",
        grey: "#787675",
        footerBg: "#272727",
        yieldBorder: 'rgba(3, 81, 58, 1)',
        offsetBorder: 'rgba(51, 69, 102, 1)'
      },
      backgroundImage: {
        'primary': 'linear-gradient(180deg, #0AF7B1 0%, #09AD7C 44.27%, #087051 100%)',
        'blue': '#9EBAF0',
        'brand': 'linear-gradient(270deg, #A8C4EF 39.58%, #0AF2AD 100%)',
        'launchpad-header': 'linear-gradient(50.39deg, #0B0D13 15.27%, #13151C 46.91%, #1F2128 91.42%);',
        'brand-background': "url('/assets/images/common/brand-background.jpeg')",
        'green-blue': 'linear-gradient(270deg, #A8C4EF 39.58%, #0AF2AD 100%);',
        'navigation': 'linear-gradient(90.2deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.13) 0.01%, rgba(255, 255, 255, 0.2) 0.02%, rgba(255, 255, 255, 0.1) 43.23%, rgba(255, 255, 255, 0) 70.83%, rgba(255, 255, 255, 0.24) 100%);',
        'mint': 'linear-gradient(166.49deg, #13151C 32.69%, rgba(0, 0, 0, 0) 170.72%), linear-gradient(270deg, rgba(168, 196, 239, 0.4) 23.44%, rgba(10, 242, 173, 0.4) 48.44%);',
        'project-info': 'linear-gradient(270deg, rgba(168, 196, 239, 0.1) 39.58%, rgba(10, 242, 173, 0.1) 100%);',
        'project-info-border': 'linear-gradient(270deg, rgba(168, 196, 239, 0.1) 39.58%, rgba(10, 242, 173, 0.1) 100%);',
        'portfolio': "linear-gradient(50.39deg, rgba(11, 13, 19, 0.5) 15.27%, rgba(19, 21, 28, 0.5) 46.91%, rgba(31, 33, 40, 0.5) 91.42%), url('/assets/images/backgrounds/bg-portfolio.jpeg');",
        'farming': "linear-gradient(50.39deg, rgba(11, 13, 19, 0.2) 15.27%, rgba(19, 21, 28, 0.2) 46.91%, rgba(31, 33, 40, 0.2) 91.42%), url('/assets/images/backgrounds/bg-farming.jpeg');",
        'farming-footer': "url('/assets/images/backgrounds/bg-farming-footer.png');"
      },
      backgroundColor: {
        'light-5': 'rgba(208, 209, 214, 0.05);',
        'light-80': 'rgba(11, 13, 19, 0.8);',
        'dark-40': 'rgba(11, 13, 19, 0.4);',
        'undeposited': '#292A2B',
      }
    }
  },
  plugins: [require("tailwindcss-radix")()],
}