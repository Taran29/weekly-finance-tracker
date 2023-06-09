/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "2/1": "2/1",
      },
      spacing: {
        150: "150px",
      },
      backgroundImage: {
        "signup-bg": "url('/signup.jpg')",
      },
    },
  },
  plugins: [],
};

module.exports = config;
