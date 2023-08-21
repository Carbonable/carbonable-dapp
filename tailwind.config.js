/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js}"
  ],
  safelist: [
    'bg-farming-border-green',
    'bg-farming-border-blue',
    'bg-farming-border-brown',
    'bg-farming-header-green',
    'bg-farming-header-blue',
    'bg-farming-header-brown',
    'bg-farming-separator-green',
    'bg-farming-separator-blue',
    'bg-farming-separator-brown',
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
          light: '#D9CC96'
        },
        blue: {
          DEFAULT: '#9EBAF0',
          dark: '#334566',
          light: '#C5D7FA'
        },
        opacityLight: {
          5: 'rgba(208, 209, 214, 0.05)',
          10: 'rgba(208, 209, 214, 0.1)',
          80: 'rgba(208, 209, 214, 0.8)',
        },
        opacityDark: {
          40: 'rgba(11, 13, 19, 0.4)',
          50: 'rgba(11, 13, 19, 0.5)',
          60: 'rgba(11, 13, 19, 0.6)',
          70: 'rgba(11, 13, 19, 0.7)',
          80: 'rgba(11, 13, 19, 0.8)',
          90: 'rgba(11, 13, 19, 0.9)',
        },
        undeposited: '#DA7575',
        undepositedBorder: 'rgba(218, 117, 117, 0.3)',
        beaige: '#EFECEA',
        green: "#0AF2AD",
        lightblue: "#AAC6FD",
        grey: "#787675",
        footerBg: "#272727",
        yieldBorder: 'rgba(3, 81, 58, 1)',
        offsetBorder: 'rgba(51, 69, 102, 1)',
        darkRed: '#AD5C61',
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
        'project-info-border': 'linear-gradient(rgba(53, 63, 77, 1), rgba(16, 82, 67, 1));',
        'portfolio': "linear-gradient(50.39deg, rgba(11, 13, 19, 0.5) 15.27%, rgba(19, 21, 28, 0.5) 46.91%, rgba(31, 33, 40, 0.5) 91.42%), url('/assets/images/backgrounds/bg-portfolio.jpeg');",
        'farming': "linear-gradient(50.39deg, rgba(11, 13, 19, 0.5) 15.27%, rgba(19, 21, 28, 0.5) 46.91%, rgba(31, 33, 40, 0.5) 91.42%), url('/assets/images/backgrounds/bg-farming.jpeg');",
        'farming-footer': "url('/assets/images/backgrounds/bg-farming-footer.png');",
        'farming-border-green': 'linear-gradient(rgba(125, 248, 211, 0.2), rgba(9, 225, 161, 0.2), rgba(9, 225, 161, 0.03))',
        'farming-border-blue': 'linear-gradient(rgba(107, 154, 224, 0.5), rgba(85, 153, 255, 0.03))',
        'farming-border-brown': 'linear-gradient(rgba(208, 151, 64, 0.4), rgba(255, 187, 85, 0.03))',
        'farming-header-green': 'linear-gradient(180deg, rgba(125, 248, 211, 0.2) -48.56%, rgba(9, 225, 161, 0.2) -48.55%, rgba(9, 225, 161, 0.02) 84.2%);',
        'farming-header-blue': 'linear-gradient(357.63deg, rgba(85, 153, 255, 0.03) 20.41%, rgba(98, 126, 234, 0.3) 141.61%);',
        'farming-header-brown': 'linear-gradient(357.33deg, rgba(255, 187, 85, 0.03) 23.28%, rgba(255, 187, 85, 0.3) 141.15%);',
        'farming-separator-green': 'linear-gradient(90deg, rgba(9, 225, 161, 0.02), rgba(125, 248, 211, 0.4), rgba(9, 225, 161, 0.02));',
        'farming-separator-blue': 'linear-gradient(90deg, rgba(85, 153, 255, 0.025), rgba(141, 165, 255, 0.5), rgba(85, 153, 255, 0.025));',
        'farming-separator-brown': 'linear-gradient(90deg, rgba(255, 187, 85, 0.025), rgba(255, 187, 85, 0.5), rgba(255, 187, 85, 0.025));',
        'farming-card': "linear-gradient(0deg, rgba(255, 255, 255, 0.015), rgba(255, 255, 255, 0.015)), url('/assets/images/backgrounds/bg-farming-card.png');",
        'allocation-yield': "linear-gradient(166.49deg, #13151B 32.69%, rgba(0, 0, 0, 0) 170.72%), linear-gradient(180deg, #0AF7B1 0%, #09AD7C 44.27%, #087051 100%);",
        'allocation-offset': "linear-gradient(166.49deg, #13151B 32.69%, rgba(0, 0, 0, 0) 170.72%), linear-gradient(180deg, #A1BCF0 0%, #7B90BA 40.1%, #394D73 100%);",
        'beta-button': "linear-gradient(180deg, rgba(11, 255, 138, 0.4) 0%, rgba(113, 170, 255, 0.4) 100%);"
      },
      backgroundColor: {
        'light-5': 'rgba(208, 209, 214, 0.05);',
        'light-80': 'rgba(11, 13, 19, 0.8);',
        'dark-40': 'rgba(11, 13, 19, 0.4);',
        'undeposited': '#292A2B',
        'farming-card-bg': '#15171e',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200%': '200% auto',
      }
    }
  },
  plugins: [require("tailwindcss-radix")()],
}