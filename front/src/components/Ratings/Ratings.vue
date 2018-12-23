<template>
  <div id="ratings" styleName="ratings">
    <i styleName="star-item" :class="item" v-for="(item, index) in itemClasses" :key="index"></i>
    <span>{{score}}</span>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  props: ['score'],
  computed: {
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i ++) {
        result.push(this.$style['on'])
      }
      if (hasDecimal) {
        result.push(this.$style['half'])
      }
      while (result.length < 5) {
        result.push(this.$style['off'])
      }
      return result
    }
  }
}
</script>

<style lang='stylus' module>
.ratings
  height 19px
  .star-item
    vertical-align top
    display inline-block
    width 20px
    height 19px
    background-size 100% 100%
    &.on
      background-image url("./star_on.png")
    &.half
      background-image url("./star_half.png")
    &.off
      background-image url("./star_off.png")
    &:last-of-type
      margin-right 8px
  span
    line-height 19px
</style>