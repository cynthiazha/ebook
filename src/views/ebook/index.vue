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
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  }
}
</script>

<style>

</style>
