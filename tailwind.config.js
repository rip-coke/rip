module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_notices/*.md',
    './*.md',
    './*.html',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        roboto: ['ubuntu-regular', 'Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: []
}
