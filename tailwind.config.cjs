const plugin = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    container: false
  },
  theme: {
    backgroundPosition: {
      'right-bottom': '14.391143911439114% 99.41176470588235%',
      'center': '50%'

    },
    extend: {
      colors: {
        orange: '#ee4d2d',
        gray555: '#555',
        gray54: 'rgba(0,0,0,.54)',
        black87: 'rgba(0,0,0,.87)',
        grayeb: '#ebebeb',
        yellowrating: 'rgb(255, 167, 39)',
        yellowratesale: 'rgba(255,212,36,.9)',
        orangebuttoncart: 'rgba(255,87,34,.1)',
        colordotted: 'rgba(0, 0, 0, 0.09)',
        colortextfooter: 'rgba(0,0,0,.65)'
      },
      backgroundImage: {
        'not-found': "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
        'footer': "url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/3ce17addcf90b8cd3952b8ae0ffc1299.png')"
      }
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ],
}