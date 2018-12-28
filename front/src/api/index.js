import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export function fetchBooklist() {
  return axios('/booklist')
}

export function fetchCategory(params) {
  return axios('/type', { params })
}

export function fetchBookDetail(params) {
  return axios('/booklist', { params })
}

export function fetchChapter(params) {
  return axios('/book', { params })
}