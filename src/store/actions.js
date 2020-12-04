const actions = {
  'set_fileName' ({ commit }, fileName) {
    return commit('SET_FILENAME', fileName)
  },
  'set_menuVisible' ({ commit }, menuVisible) {
    return commit('SET_MENUVISIBLE', menuVisible)
  },
  'set_setVisible' ({ commit }, visible) {
    return commit('SET_SETVISIBLE', visible)
  },
  'set_defaultFontSize' ({ commit }, fontSize) {
    return commit('SET_DEFAULTFONTSIZE', fontSize)
  },
  'set_currentBook' ({ commit }, book) {
    return commit('SET_CURRENTBOOK', book)
  },
  'set_fontFamilyVisible' ({ commit }, visible) {
    return commit('SET_FONTFAMILYVISIBLE', visible)
  },
  'set_fontFamily' ({ commit }, fontFamily) {
    return commit('SET_DEFAULTFONTFAMILY', fontFamily)
  },
  'set_defaultTheme' ({ commit }, theme) {
    return commit('SET_DEFAULT_THEME', theme)
  },
  'set_readingProgress' ({ commit }, readingProgress) {
    return commit('SET_READING_PROGRESS', readingProgress)
  },
  'set_bookAvailable' ({ commit }, bookAvailable) {
    return commit('SET_BOOK_AVAILABLE', bookAvailable)
  },
  'set_section' ({ commit }, section) {
    return commit('SET_SECTION', section)
  },
  'set_isPagination' ({ commit }, isPagination) {
    return commit('SET_ISPAGINATION', isPagination)
  },
  'set_navigation' ({ commit }, navigation) {
    return commit('SET_NAVIGATION', navigation)
  }
}
export default actions
