/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'primary': '#eb1234', //red
      'primary-focus': '#950b21',
      'secondary': '#333',//dark grey
      'secondary-focus': '#2a2a2a',
      'accent': '#ddd', //light grey
      'accent-focus': '#c7c7c7',
      'black': '#070707',
      'white': '#ffffff',
      'info': '#5bc0de',
      'success': '#5cb85c',
      'warning': '#f0ad4e',
      'error': '#d9534f',
    }

  },
  plugins: [],
}
