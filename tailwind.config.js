/* eslint-disable */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.vue",
    "./src/**/*.js",
    // etc.
  ],
  theme: {},
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
