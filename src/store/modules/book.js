const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1,
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    currentBook: '',
    fontFamilyVisible: false,
    defaultTheme: 'Default'
  },
  mutations: {
    'SET_FILENAME' (state, fileName) {
      state.fileName = fileName
    },
    'SET_MENUVISIBLE' (state, menuVisible) {
      state.menuVisible = menuVisible
    },
    'SET_SETVISIBLE' (state, visible) {
      state.settingVisible = visible
    },
    'SET_DEFAULTFONTSIZE' (state, fontSize) {
      state.defaultFontSize = fontSize
    },
    'SET_DEFAULTFONTFAMILY' (state, fontFamily) {
      state.defaultFontFamily = fontFamily
    },
    'SET_CURRENTBOOK' (state, book) {
      state.currentBook = book
    },
    'SET_FONTFAMILYVISIBLE' (state, visible) {
      state.fontFamilyVisible = visible
    },
    'SET_DEFAULT_THEME' (state, theme) {
      state.defaultTheme = theme
    }
  }
}
export default book
