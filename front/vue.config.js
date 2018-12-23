const path = require('path')

const devProxy = ['/pc', '/weixin', '/android']
const proEnv = require('./config/pro.env')  // 生产环境
const uatEnv = require('./config/uat.env')  // 测试环境
const devEnv = require('./config/dev.env')  // 本地环境
const env = process.env.NODE_ENV
let target = ''
// 默认为本地环境
switch (env) {
  case 'production':  // 生产环境
    target = proEnv.hosturl
    break
  case 'test':  // 测试环境
    target = uatEnv.hosturl
    break
  default:  // 本地环境
    target = devEnv.hosturl
}
// 生产代理配置对象
let proxyObj = {}
devProxy.forEach((val, index) => {
  proxyObj[val] = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${val}`]: val
    }
  }
})

module.exports = {
  css: {
    // modules: true
  },
  devServer: {
    disableHostCheck: true,
    proxy: proxyObj, // string | Object
    before: app => { }
  }
}