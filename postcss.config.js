/* eslint-disable */
const autoprefixer = require("autoprefixer")
const tailwindcss = require("tailwindcss")

module.exports = {
  plugins: [tailwindcss("tailwind.config.js"), autoprefixer()],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
