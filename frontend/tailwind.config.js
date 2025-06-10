/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
        kkonghae: ['var(--font-kkonghae)', 'cursive'],
      },
    },
  },
  plugins: [],
};
