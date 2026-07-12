/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        secondary: '#1A1A1A',
        accent: '#FFD700',
      },
    },
  },
  plugins: [],
}