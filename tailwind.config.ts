/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: '#23272a', // Your custom color
        clay: '#bf9d85',
      },
    },
  },
  plugins: [],
};
