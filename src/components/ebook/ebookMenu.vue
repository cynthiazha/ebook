<template>
  <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="menuVisible" :class="{'hide-box-shadow': settingVisible >=0 || !menuVisible}">
        <div class="icon-wrapper" :class="{'selected': settingVisible === 3}">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 2}">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 1}">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 0}">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-font-family-pop></ebook-font-family-pop>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import ebookSettingFont from './ebookSettingFont.vue'
import EbookFontFamilyPop from './ebookFontFamilyPop.vue'
export default {
  components: { ebookSettingFont, EbookFontFamilyPop },
  mixins: [ebookMixin],
  methods: {
    showSetting (index) {
      this.set_setVisible(index)
    }
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
  background-color: #fff;
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-A {
      font-size: px2rem(20);
    }
  }
}
</style>
