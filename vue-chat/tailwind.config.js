const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      'woodsmoke': { DEFAULT: '#161819', '50': '#6C767B', '100': '#626B70', '200': '#4F575A', '300': '#3C4244', '400': '#292D2F', '500': '#161819', '600': '#000000', '700': '#000000', '800': '#000000', '900': '#000000' },
    }
  },
  plugins: [],
}
