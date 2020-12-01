<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
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
    initEpub () {
      const BASE_URL = process.env.VUE_APP_RES_URL + 'epub/'
      this.book = new Epub(BASE_URL + this.fileName + '.epub')
      this.set_currentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.timeStart = event.timeStamp
      })
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
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
      this.hideTitleAndMenu()
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.set_setVisible(-1)
        this.hideFontFamilySetting(false)
      }
      this.set_menuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.set_menuVisible(false)
      this.set_setVisible(-1)
      this.hideFontFamilySetting(false)
    }
  }
}
</script>

<style>

</style>
