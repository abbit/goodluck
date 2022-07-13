/* eslint-disable */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
    "./src/**/*.js",
    // etc.
  ],
  theme: {},
  plugins: [require("@tailwindcss/forms")],
}
