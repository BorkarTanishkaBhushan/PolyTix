/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{html,js}",
    // {transform: (content) => content.replace(/taos:/g, '')},
  ],
  // safelist: [
  //   '!duration-[0ms]',
  //   '!delay-[0ms]',
  //   'html.js :where([class*="taos:"]:not(.taos-init))'
  // ],
  theme: {
    extend: {
      backgroundImage: {
        
      },
      fontFamily:{
        main: ['League Spartan']
      },
      'animation': {
        'text':'text 1.5s ease infinite',
    },
    'keyframes': {
        'text': {
            '0%, 100%': {
               'background-size':'200% 200%',
                'background-position': 'left center'
            },
            '50%': {
               'background-size':'200% 200%',
                'background-position': 'right center'
            }
        },
    }
    },
  },
  plugins: [
    // require('taos/plugin')
  ],
}
  