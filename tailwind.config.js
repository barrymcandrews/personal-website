/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Open Sans', 'Segoe UI', 'Tahoma', 'sans-serif'],
      mono: ['Source Code Pro', 'Consolas', 'Menlo', 'Courier New', 'monospace'],
      title: ['Montserrat', 'DejaVu Sans', 'Verdana', 'sans‑serif']
    },
    gray: {
      100: '#f2f2f2',
      200: '#EBEBEB',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#7a7d81',
      700: '#666666',
      800: '#424242',
      900: '#212121'
    },
    slate: {
      900: '121216'
    }
  },
  plugins: []
};
