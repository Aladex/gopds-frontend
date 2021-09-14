module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.booksdump.com/'
    : '/'
}