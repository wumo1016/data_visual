
function resolve(dir) {
  return require('path').join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 3000,
  },
  productionSourceMap: false,
  assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
  },
  lintOnSave: false,
}
