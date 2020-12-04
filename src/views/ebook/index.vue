<template>
  <div id="read">
    <ebook-reader></ebook-reader>
    <ebook-title></ebook-title>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/ebookReader'
import EbookTitle from '../../components/ebook/ebookTitle.vue'
import EbookMenu from '../../components/ebook/ebookMenu.vue'
import { ebookMixin } from '../../utils/mixin'
import { getReadingTime, setReadingTime } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  methods: {
    countReadingTime () {
      let readingTime = getReadingTime(this.fileName) || 0
      this.task = setInterval(() => {
        readingTime++
        if (readingTime % 30 === 0) {
          setReadingTime(this.fileName, readingTime)
        }
      }, 1000)
    }
  },
  mounted () {
    this.countReadingTime()
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style>

</style>
