/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}", // Adjust based on your file types
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example of extending the font family
      },
      colors: {
        primary: '#1DA1F2', // Example of extending colors
        secondary: '#14171A',
      },
      // fontSize: {
      //   '10xl': '10rem', // Example of extending font sizes
      // },
      // spacing: {
      //   '128': '32rem', // Example of extending spacing
      //   '144': '36rem',
      // },
      // screens: {
      //   '3xl': '1600px', // Example of adding custom screen sizes
      // },
      gridTemplateColumns: {
        '70/30': '70% 28%', // Example of custom grid template columns
      },
    },
  },
  plugins: [],
}

