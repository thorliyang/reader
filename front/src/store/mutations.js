import localEvent from './local'

export default {
  fetchBooklist: (state, data) => {
    state.booklist = data
  },
  fetchBookDetail: (state, data) => {
    state.bookDetail = data
  },
  chooseBook: (state, id) => {
    state.curBookDetailId = id
  },
  toggleBar: (state, boolean) => {
    if (boolean !== undefined) {
      state.bar = boolean
    } else {
      state.bar = !state.bar
    }
  },
  toggleListPanel: (state, boolean) => {
    if (boolean !== undefined) {
      state.list_panel = boolean
    } else {
      state.list_panel = !state.list_panel
    }
  },
  toggleFontPanel: (state, boolean) => {
    if (boolean !== undefined) {
      state.font_panel = boolean
    } else {
      state.font_panel = !state.font_panel
    }
  },
  fetchSize: (state, num) => {
    state.fz_size = num
    localEvent.StorageSetter('fz_size', state.fz_size)
  },
  fzSizeAdd: (state) => {
    state.fz_size ++
    if (state.fz_size >= 24) {
      state.fz_size = 24
    } else {
      localEvent.StorageSetter('fz_size', state.fz_size)
    }
  },
  fzSizeSub: (state) => {
    state.fz_size --
    if (state.fz_size <= 14) {
      state.fz_size = 14
    } else {
      localEvent.StorageSetter('fz_size', state.fz_size)
    }
  },
  changeBgColor: (state, i) => {
    state.bg_color = i
    localEvent.StorageSetter('bg_color', i)
  },
  switchNight: (state) => {
    state.bg_night = !state.bg_night
    localEvent.StorageSetter('bg_night', state.bg_night)
  }
}