<template>
<transition name="slide-down">
  <div class="title-wrapper" v-show="menuVisible">
    <div class="left" @click="back">
      <span class="icon-back"></span>
    </div>
    <div class="right">
      <div class="icon-item">
        <span class="icon-shelf"></span>
      </div>
      <div class="icon-item">
        <span class="icon-cart"></span>
      </div>
      <div class="icon-item">
        <span class="icon-more"></span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['menuVisible'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/style/global';
.title-wrapper{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 200;
  display: flex;
  height: px2rem(78);
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
  font-size: px2rem(22);
  background-color: #fff;
  .left {
    flex: 0 0 px2rem(37);
    @include right;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-item{
      flex: 0 0 px2rem(37);
      @include left
    }
  }
}
</style>
