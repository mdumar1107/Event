/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7848F4',    // Purple
        black: '#131315',      // Black
        white: '#FFFFFF',      // White
        navy: '#10107B',       // Navy Blue
        background: '#F8F8FA', // Background Grey
      }
    },
  },
  plugins: [],
}

