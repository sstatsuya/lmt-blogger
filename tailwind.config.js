// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '20': '20deg',
      },
      backgroundColor: {
        primary: '#040a16',
        highlight: '#3e3f44',
        hover: 'rgb(62, 62, 74)'
      },
      colors: {
        primary: 'red',
        secondary: 'purple',
        white: "#FFF",
        black: "#000",
        border: 'hsl(215deg 9.45% 41.68%)',
        'dim-border': 'rgb(46, 43, 48)',
        plhd: 'hsl(215deg 9.45% 41.68%)',
        // title: 'rgb(62, 137, 250)'
        title: 'rgb(117, 3, 183)',
        footer: 'rgb(12 21 35)'
      },
      borderWidth: {
        '1': '1px',  // Thêm giá trị border-1
      },
      animation: {
        blink: 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.flex-between': {
          'display': 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
        },
        '.flex-center': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      })
    },
    function ({ addUtilities }) {
      addUtilities({
        '.animate-rotate': {
          transition: 'all 0.5s',
          transform: 'scale(1) rotate(0deg)',
          '&:hover': {
            transform: 'scale(1) rotate(2deg)',
          },
        },
        '.animate-zoomIn': {
          'cursor': 'default',
          transition: 'all 0.5s',
          transform: 'scale(1) ',
          '&:hover': {
            transform: 'scale(1.025) ',
          },
        },
        '.animate-transition': {
          transition: 'all 0.5s',
        }
      })
    }
  ],
}
