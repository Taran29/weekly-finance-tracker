/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        '1/0.5': '1 / 0.5',
      },
      spacing: {
        '150': '150px',
      }
    },
  },
  plugins: [],
};

module.exports = config;
