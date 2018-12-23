export default {
  install(Vue) {
    Vue.prototype.common = {
      defaultImage(e) {
        e.target.src = 'http://www.zwdu.com/files/article/image/20/20962/20962s.jpg'
      },
      type(val) {
        switch (val) {
          case 1: return '玄幻'
          case 2: return '修真'
          case 3: return '都市'
          case 4: return '历史'
          case 5: return '网游'
          default: return '类型'
        }
      }
    }
  }
}