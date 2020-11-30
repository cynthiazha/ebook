<template>
  <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="menuVisible"></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['menuVisible'])
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/style/global';
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  font-size: px2rem(22);
}
</style>
