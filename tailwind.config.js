/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1A2332',
          800: '#131B29',
        },
      },
      fontFamily: {
        'share-tech': ['"Share Tech Mono"', 'monospace'],
        'barlow': ['Barlow', 'sans-serif'],
        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
