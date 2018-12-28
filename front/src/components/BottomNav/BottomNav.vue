<template>
  <div id="bottom-nav" styleName="bottom-nav">
    <div styleName="item" @click="showListPanel">
      <div styleName="item-warp">
        <i styleName="fontsIcon" class="fontsIcon icon-mulu"></i>
        <span styleName="title">目录</span>
      </div>
    </div>
    <div styleName="item" :class="ClassFontPanelOn" @click="showFontPanel">
      <div styleName="item-warp">
        <i styleName="fontsIcon" class="fontsIcon icon-font"></i>
        <span styleName="title">字体</span>
      </div>
    </div>
    <div styleName="item" @click="swithNight">
      <div styleName="item-warp">
        <i styleName="fontsIcon" class="fontsIcon" :class="classNightIcon"></i>
        <span styleName="title">{{NightTitle}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapState } from 'vuex'

export default {
  mixins: [CSSModules()],
  computed: {
    ...mapState([
      'font_panel', 'bg_night'
    ]),
    ClassFontPanelOn() {
      return this.font_panel ? this.$style['on'] : null
    },
    classNightIcon() {
      return this.bg_night ? 'icon-yejianmoshi1' : 'icon-baitianmoshi'
    },
    NightTitle() {
      return this.bg_night ? '夜间模式' : '白天模式'
    }
  },
  methods: {
    showListPanel() {
      this.$store.commit('toggleListPanel', true)
      this.$store.commit('toggleFontPanel', false)
    },
    showFontPanel() {
      this.$store.commit('toggleFontPanel')
    },
    swithNight() {
      this.$store.commit('switchNight')
    }
  }
}
</script>

<style lang='stylus' module>
.bottom-nav
  position fixed
  bottom 0
  height 70px
  display flex
  align-items center
  background-color #000
  width 100%
  z-index 20
  margin 0 auto
  text-align center
  .item
    flex 1
    display inline-block
    color #fff
    &.on
      color #ed424b
    .item-warp
      position relative
      margin 0 auto
      .fontsIcon
        display block
        margin-bottom 3px
        font-size 25px
      .title
        line-height 10px
        font-size 10px
</style>