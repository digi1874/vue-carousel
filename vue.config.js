module.exports = {
  // configureWebpack: {
  //   externals: {
  //     '../npm_package: 'carousel'
  //   }
  // }
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-carousel/' : '/'
}
