/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefce8',
          100: '#fef9c3',
        },
      },
    },
  },
  plugins: [],
};
