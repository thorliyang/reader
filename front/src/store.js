import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './store/mutations'
import actions from './store/actions'
import getters from './store/getters'

Vue.use(Vuex)

const state = {
  // 书籍列表
  booklist: [],
  // 当前书籍ID
  curBookDetailId: 1,
  // 当前书籍信息
  bookDetail: {},
  // 上下面板状态
  bar: false,
  // 字体面板状态
  font_panel: false,
  // 目录面板状态
  list_panel: false,
  // 背景颜色
  bg_color: 1,
  // 夜晚模式
  bg_night: false,
  // 字体大小
  fz_size: 16
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
