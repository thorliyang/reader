import { fetchBooklist, fetchCategory, fetchBookDetail, fetchChapter } from '../api'
import localEvent from './local'


export default {
  getBooklist: ({ commit }) => {
    let req = fetchBooklist()
    req.then((res) => {
      commit('fetchBooklist', res.data)
    })
  },
  getCategory: ({ commit }, options) => {
    let { params } = options
    let req = fetchCategory(params)
    return req
  },
  getBookDetail: ({ commit }, options) => {
    let { params, callback } = options
    let req = fetchBookDetail(params)
    req.then((res) => {
      commit('fetchBookDetail', res.data)
      callback(res.data)
    })
  },
  getLlkeBook: ({ commit }, options) => {
    let { params } = options
    let req = fetchBookDetail(params)
    return req
  },
  getChapter: ({ commit }, options) => {
    let { params } = options
    let req = fetchChapter(params)
    return req
  },
}