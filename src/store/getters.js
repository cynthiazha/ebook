const book = {
  fileName: state => state.book.fileName,
  menuVisible: state => state.book.menuVisible,
  settingVisible: state => state.book.settingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  defaultFontFamily: state => state.book.defaultFontFamily,
  currentBook: state => state.book.currentBook,
  fontFamilyVisible: state => state.book.fontFamilyVisible,
  defaultTheme: state => state.book.defaultTheme,
  readingProgress: state => state.book.readingProgress,
  bookAvailable: state => state.book.bookAvailable,
  section: state => state.book.section
}
export default book
