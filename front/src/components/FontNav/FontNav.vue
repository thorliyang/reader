<template>
  <div id="font-nav" styleName="font-nav font-container">
    <div styleName="child-mod">
      <span styleName="title">字号</span>
      <button id="large-font" styleName="spe-button" @click="add">大</button>
      <button id="large-font" styleName="spe-button" @click="sub">小</button>
    </div>
    <div styleName="child-mod">
      <span styleName="title">背景</span>
      <div styleName="bk-container" :class="currentClass(i)" v-for="(n,i) in 6" :key="i">
        <div styleName="color_btn" @click="changeColor(i)"></div>
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
      'font_panel', 'bg_color'
    ]),
    // 背景切换样式
    currentClass() {
      return function(i) {
        return i === this.bg_color ? this.$style['current'] : ''
      }
    }
  },
  methods: {
    // 增加一号字体
    add() {
      this.$store.commit('fzSizeAdd')
    },
    // 减少一号字体
    sub() {
      this.$store.commit('fzSizeSub')
    },
    // 改变背景颜色
    changeColor(i) {
      if (i === this.bg_color) return false
      this.$store.commit('changeBgColor', i)
    }
  }
}
</script>

<style lang='stylus' module>
bac($color)
  background-color $color

.font-nav
  position fixed
  bottom 70px
  height 135px
  background-color rgba(0, 0, 0, .85)
  width 100%
  color #fff
  font-size 14px
  z-index 20
  .child-mod
    padding 5px 20px
    margin-top 15px
    .title:first-child
      margin-right 20px
    .spe-button
      margin-right 10px
      background none 
      border 1px solid #8c8c8c
      padding 5px 40px
      color #fff
      display inline-block
      border-radius 16px
      &:focus
        outline none 
    .bk-container
      position relative
      display inline-block
      height 30px
      width 30px
      background-color #fff
      border-radius 50%
      vertical-align -14px
      margin-left 10px
      &.current
        top 1px
        border 1px solid #ff7800
      .color_btn
        height 30px
        width 30px
        border-radius 15px
    
    .bk-container:nth-child(2) .color_btn 
      bac(#e9dfc7)
    .bk-container:nth-child(3) .color_btn 
      bac(#e7eee5)
    .bk-container:nth-child(4) .color_btn 
      bac(#a4a4a4)
    .bk-container:nth-child(5) .color_btn 
      bac(#cdefcd)
    .bk-container:nth-child(6) .color_btn 
      bac(#283548)
    .bk-container:nth-child(7) .color_btn 
      bac(#0f1410)
    
</style>