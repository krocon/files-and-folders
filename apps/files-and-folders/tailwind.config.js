const {join} = require('path');

module.exports = {
  purge: [
    join(__dirname, 'src/**/*.{ts,html}')
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
