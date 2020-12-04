<template>
  <div class="slide-contents-list">
    <div class="slide-contents-item" v-for="(item, index) in category" :key="index" @click="display(item.href)">
      <span class="slide-contents-item-label" :class="{'selected': section === index}" :style="{'font-weight': bold}">{{item.label.trim()}}</span>
      <span class="slide-contents-item-page">{{item.page}}</span>
      <categoryList v-if="item.subitems" :category="item.subitems" style="margin-left:10px" :bold="bd"></categoryList>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  props: {
    category: Array,
    bold: {
      default: 700,
      type: Number
    }
  },
  data () {
    return {
      bd: 100,
      count: 0
    }
  },
  mounted () {
    console.log(this.category.length)
  },
  name: 'categoryList',
  mixins: [ebookMixin],
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/global";
.slide-contents-list {
  padding: 0 px2rem(15);
  box-sizing: border-box;
  text-align: left;
  &:last-child {
    border-bottom: 0!important;
  }
  .slide-contents-item {
    padding: px2rem(14) 0;
    box-sizing: border-box;
    @include ellipsis;
    .slide-contents-item-label {
      display: inline-block;
      width: 85%;
      font-size: px2rem(14);
      line-height: px2rem(16);
      @include ellipsis;
    }
    .slide-contents-item-page {
      flex: 0 0 px2rem(30);
      font-size: px2rem(10);
      @include right;
    }
  }
}
</style>
