module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './_posts/*.html',
    './_pages/*.md',
    './_pages/*.html',
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
