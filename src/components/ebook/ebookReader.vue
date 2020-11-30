<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.Epub = Epub
export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('set_fileName', fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    initEpub () {
      const BASE_URL = 'http://localhost:8090/epub/'
      this.book = new Epub(BASE_URL + this.fileName + '.epub')
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
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
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu () {
      console.log('showMenu')
    }
  }
}
</script>

<style>

</style>
