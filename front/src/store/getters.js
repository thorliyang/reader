export default {
  hotbook: (state) => {
    return state.booklist.filter((item, index) => {
      return index < 20 && index % 2 === 1
    })
  },
  topbook: (state) => {
    return state.booklist.filter((item, index) => {
      return index < 20 && index % 2 === 0
    })
  },
  freebook:(state) => {
    return state.booklist.filter((item, index) => {
      return index < 20 && index % 3 === 2
    })
  },
  newbook: (state) => {
    return state.booklist.filter((item, index) => {
      return index < 20 && index % 3 === 2
    }).splice(0, 3)
  },
  endbook: (state) => {
    return state.booklist.filter((item) => {
      return item.serialize === '完本' && item.ratings >= 4
    }).splice(0, 5)
  },
  likebook: (state) => {
    return state.booklist.filter((item, index) => {
      return index % 4 === 2
    }).splice(0, 3)
  }
}