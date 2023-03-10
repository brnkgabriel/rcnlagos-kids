/** @type {import('tailwindcss').Config} */
let plugin = require("tailwindcss/plugin")
module.exports = {
  darkMode: "class",
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ], 
  theme: {
    extend: {
      gridTemplateColumns: {
        'autofit': 'repeat(autofit, minmax(100px, 1fr))',
      },
      gridTemplateRows: {
        'autofit': 'repeat(autofit, minmax(100px, 1fr))',
      },
      fontSize: {
        'mammoth': ['10rem', { lineHeight: '1rem' }],
        xs: ['0.75rem', { lineHeight: '0.8rem' }],
        xxs: ['0.25rem', { lineHeight: '1rem' }],
      },
      colors: {
        rcnblue: {
          100: "#cccccc",
          200: "#777777",
          500: "#282828",
        },
        rcnorange: {
          500: "#FD6C03"
        },
        rcnred: {
          500: "#F71103"
        },
        rcngray: {
          100: "rgba(0,0,0,0.5)",
          500: "#f5f5f5",
          700: "#eaeded",
          900: "#75757a",
        }
      },
      fontSize: {
        'xxs': '10px',
        'xxxs': '8px'
      },
      boxShadow: {
        "custom": "0 2px 5px 0 rgb(0 0 0 / 5%)",
        "inset": "inset 0 2px 5px 0 rgb(0 0 0 / 5%)",
        "cta": "0 2px 4px 0 rgb(0 0 0 / 20%)"
      },
      width: {
        '60%' : '60%',
        '40%' : '40%',
        'details': 'calc(100% - 150px)',
        'listitemdetails': 'calc(100% - 120px)',
        'card': 'calc(100% - 32px)',
        'mustfit': 'fit-content !important'
      },
      height: {
        '60%' : '60%',
        '40%' : '40%',
        'middle': 'calc(100% - 128px)',
        'listheight': 'calc(100% - 207px)',
        'cardlistheight': 'calc(100% - 28px)',
        'form': 'calc(100% - 16px)',
        'students': 'calc(100% - 24px)',
        'thumbnails': 'calc(100% - 44px)',
        'slide': 'calc(100% - 20px) !important',
        'reverseprofile': 'calc(100% - 144px)',
        'smain': 'calc(100% - 135px)'
      },
      spacing: {
        "half": "calc(50% + 1px)"
      },
      keyframes: {

      },
      animation: {
        "load-spin": "spin .3s infinite linear",
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        'auth-portrait': "url('/images/bg_1080x1920.jpg')",
        'auth-landscape': "url('/images/bg_1920x1080.jpg')",
        'auth-portrait-lg': "linear-gradient(195deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('/images/bg_1080x1920.jpg')",
        'auth-landscape-lg': "linear-gradient(195deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('/images/bg_1920x1080.jpg')",
        'brand': "url('/icons/rcn-lagos-white.svg')",
        'dark-overlay': "linear-gradient(195deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5))"
      },
      fontFamily: {
        title: ['Jost'],
        body: ['Poppins, DM Sans'],
        comic: ['Comic Neue'],
        black: ['Helvetica Black, Luckiest Guy, Bowlby One SC']
      },
      scale: {
        98: ".98"
      },
      blur: {
        xs: "2px"
      }
    }
  },
}