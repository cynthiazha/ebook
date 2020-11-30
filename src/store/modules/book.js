const book = {
  state: {
    fileName: '',
    menuVisible: false
  },
  mutations: {
    'SET_FILENAME' (state, fileName) {
      state.fileName = fileName
    },
    'SET_MENUVISIBLE' (state, menuVisible) {
      state.menuVisible = menuVisible
    }
  },
  actions: {
    'set_fileName' ({ commit }, fileName) {
      return commit('SET_FILENAME', fileName)
    },
    'set_menuVisible' ({ commit }, menuVisible) {
      return commit('SET_MENUVISIBLE', menuVisible)
    }
  }
}
export default book
