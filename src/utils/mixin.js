import { mapGetters, mapActions } from 'vuex'
import { FONT_SIZE_LIST, FONT_FAMILY, themeList } from './book'
import { addStyle, removeAllCss, findThemeObject } from './util'
import * as Storage from './localStorage'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'menuVisible',
      'fileName',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'currentBook',
      'fontFamilyVisible',
      'defaultTheme',
      'readingProgress',
      'bookAvailable',
      'section',
      'isPagination',
      'navigation'
    ]),
    themeList () {
      return themeList(this)
    }
  },
  data () {
    return {
      fontSizeList: FONT_SIZE_LIST,
      fontFamily: FONT_FAMILY
    }
  },
  methods: {
    ...mapActions([
      'set_fileName',
      'set_menuVisible',
      'set_setVisible',
      'set_defaultFontSize',
      'set_currentBook',
      'set_fontFamilyVisible',
      'set_fontFamily',
      'set_defaultTheme',
      'set_readingProgress',
      'set_bookAvailable',
      'set_section',
      'set_isPagination',
      'set_navigation'
    ]),
    setFontSize (fontSize) {
      this.set_defaultFontSize(fontSize).then(() => {
        this.currentBook.rendition.themes.fontSize(fontSize + 'px')
        Storage.setFontStorage(this.fileName, fontSize)
      })
    },
    setFontFamily (fontFamily) {
      this.set_fontFamily(fontFamily).then(() => {
        if (fontFamily === 'Default') {
          this.currentBook.rendition.themes.font('Time New Roman')
        } else {
          this.currentBook.rendition.themes.font(fontFamily)
        }
        Storage.setFontFamilyStorage(this.fileName, fontFamily)
      })
    },
    showFontFamilySetting () {
      this.set_fontFamilyVisible(true)
    },
    hideFontFamilySetting () {
      this.set_fontFamilyVisible(false)
    },
    setTheme (theme) {
      this.set_defaultTheme(theme).then(() => {
        this.registerTheme()
        const bodyObject = findThemeObject(theme, this.themeList)
        for (const key in bodyObject) {
          this.currentBook.rendition.themes.override(key, bodyObject[key], true)
        }
        this.setGlobalStyle(theme)
        Storage.setThemeStorage(this.fileName, theme)
      })
    },
    registerTheme () {
      this.themeList.forEach(theme => {
        this.currentBook.rendition.themes.register(theme.name, theme.style)
      })
    },
    setGlobalStyle (theme) {
      removeAllCss()
      switch (theme) {
        case 'Default':
          addStyle('http://localhost:8090/theme/theme_default.css')
          break
        case 'Gold':
          addStyle('http://localhost:8090/theme/theme_gold.css')
          break
        case 'Eye':
          addStyle('http://localhost:8090/theme/theme_eye.css')
          break
        case 'Night':
          addStyle('http://localhost:8090/theme/theme_night.css')
          break
        default:
          addStyle('http://localhost:8090/theme/theme_default.css')
          break
      }
    },
    display (target) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
        })
      }
    },
    displayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.readingProgress / 100) // 根据百分比得到cfi
      console.log(cfi)
      this.currentBook.rendition.display(cfi).then(() => {
        this.refreshLocation()
      })
    },
    displaySection (cb) {
      const section = this.currentBook.section(this.section)
      if (section && section.href) {
        console.log(section.href)
        this.currentBook.rendition.display(section.href).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation.start && currentLocation.start.index) {
        this.set_section(currentLocation.start.index)
        const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi) // 根据cfi得到百分比
        this.set_readingProgress(Math.floor(progress * 100))
        Storage.setSectionStorage(this.fileName, currentLocation.start.cfi)
      }
    },
    hideTitleAndMenu () {
      this.set_menuVisible(false)
      this.set_setVisible(-1)
      this.hideFontFamilySetting(false)
    },
    getReadTime () {
      const readingTime = Storage.getReadingTime(this.fileName)
      let minutes = 0
      if (readingTime) {
        minutes = Math.ceil(readingTime / 60)
      }
      return this.$t('book.haveRead').replace('$1', minutes)
    }
  }
}
