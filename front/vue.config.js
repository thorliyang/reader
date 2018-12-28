const path = require('path')

const proxyObj = require('./vueConfig/environment/index')


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    // modules: true
  },
  devServer: {
    disableHostCheck: true,
    proxy: proxyObj, // string | Object
    before: app => { }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}