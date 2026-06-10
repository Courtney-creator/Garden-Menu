/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        maroon: {
          DEFAULT: '#800020',
          50: '#fff1f2',
          100: '#fde8ea',
          600: '#800020',
          700: '#6b001b',
          800: '#560016',
          900: '#420011',
        },
      },
    },
  },
  plugins: [],
};
