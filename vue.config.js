module.exports = {
  // configureWebpack: {
  //   externals: {
  //     '../npm_package: 'carousel'
  //   }
  // }
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-carousel/docs/' : '/'
}
