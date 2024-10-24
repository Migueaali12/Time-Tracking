/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'system-ui']
    },
    extend: {
      colors: {
        'hWhite': ['#f3f3f3'],
        'orangeRedime': ['#FF4C02'],
      },
    },
  },
  plugins: [],
}

