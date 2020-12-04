<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
import * as Storage from '../../utils/localStorage'
global.Epub = Epub
export default {
  mixins: [ebookMixin],
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.set_fileName(fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    initFontSize () {
      let fontSize = Storage.getFontStorage(this.fileName)
      if (!fontSize) {
        fontSize = 16
      }
      return fontSize
    },
    initFontFamily () {
      let fontFamily = Storage.getFontFamilyStorage(this.fileName)
      if (!fontFamily) {
        fontFamily = this.defaultFontFamily
      }
      return fontFamily
    },
    initTheme () {
      let theme = Storage.getThemeStorage(this.fileName)
      if (!theme) {
        theme = this.defaultTheme
      }
      return theme
    },
    initReadingProgress () {
      let progress = Storage.getReadingProgressStorage(this.fileName)
      if (!progress) {
        progress = this.readingProgress
      }
      return progress
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.setFontSize(this.initFontSize())
      this.setFontFamily(this.initFontFamily())
      this.setTheme(this.initTheme())
      this.set_readingProgress(this.initReadingProgress())
      this.rendition.display()
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
          console.log('字体文件加载完成')
        })
      })
    },
    initGesture () {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.timeStart = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        this.touchEndX = event.changedTouches[0].clientX - this.touchStartX
        this.time = event.timeStamp - this.timeStart
        if (this.touchEndX > 40 && this.time < 500) {
          this.prevPage()
        } else if (this.touchEndX < -40 && this.time < 500) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      })
    },
    parseBook () {
      this.book.loaded.navigation.then((nav) => {
        console.log(nav.toc)
        this.set_navigation(nav.toc)
      })
    },
    initEpub () {
      const BASE_URL = process.env.VUE_APP_RES_URL + 'epub/'
      this.book = new Epub(BASE_URL + this.fileName + '.epub')
      this.set_currentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (Storage.getFontStorage(this.fileName) / 16))
      }).then(locations => {
        this.set_bookAvailable(true)
        this.set_isPagination(false)
        const location = Storage.getSectionStorage(this.fileName)
        if (location) {
          this.display(location)
        } else {
          this.display()
        }
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.refreshLocation()
      }
      this.hideTitleAndMenu()
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.refreshLocation()
      }
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.set_setVisible(-1)
        this.hideFontFamilySetting(false)
      }
      this.set_menuVisible(!this.menuVisible)
    }
  }
}
</script>

<style>

</style>
