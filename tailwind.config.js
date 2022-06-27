/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif']
    },
    colors: {
      'background': '#fffffe',
      'title': '#272343',
      'text': '#2d334a',
      'highlight': '#ffd803',
      'main': '#fffffe',
      'secondary': '#e3f6f5',
      'tertiary': '#bae8e8',
      'stroke': 'black',
      'negative': '#f45d48',
      'positive': '#078080'
    }
  },
  plugins: [],
}
