import { mapGetters, mapActions } from 'vuex'
import { FONT_SIZE_LIST, FONT_FAMILY } from './book'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'menuVisible',
      'fileName',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'currentBook',
      'fontFamilyVisible'
    ])
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
      'set_fontFamily'
    ]),
    setFontSize (fontSize) {
      this.set_defaultFontSize(fontSize).then(() => {
        this.currentBook.rendition.themes.fontSize(fontSize + 'px')
      })
    },
    setFontFamily (fontFamily) {
      this.set_fontFamily(fontFamily).then(() => {
        if (fontFamily === 'Default') {
          this.currentBook.rendition.themes.font('Time New Roman')
        } else {
          this.currentBook.rendition.themes.font(fontFamily)
        }
      })
    },
    showFontFamilySetting () {
      this.set_fontFamilyVisible(true)
    },
    hideFontFamilySetting () {
      this.set_fontFamilyVisible(false)
    }
  }
}
