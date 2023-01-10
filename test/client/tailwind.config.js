/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        orange: "#FCE4D6",
        biru: "#4472C4",
      }
    },
    fontFamily:{
      avanir: ["montserrat", "sans-serif"],
    }
  },
  plugins: [],
}
