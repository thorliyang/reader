<template>
  <div id="rackMask">
    <transition name="shadow">
      <div styleName="shadow" v-if="flag" @click="cancelShadow"></div>
    </transition>
    <transition name="options">
      <div styleName="options" v-if="flag">
        <ul>
          <li @click="bookDetail">图书详情</li>
          <li @click="deleteBook">删除</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  props: ['flag', 'index'],
  methods: {
    cancelShadow() {
      this.$emit('cancelShadow')
    },
    bookDetail() {
      this.$router.push('/bookdetail/' + this.id)
    },
    deleteBook() {
      this.$emit('deleteBook')
    }
  }
}
</script>

<style lang='stylus'>
@import '../../assets/css/animate.css'
</style>

<style lang='stylus' module>
@import '../../assets/stylus/global.styl'

.shadow
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 10
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.8)
.options
  position absolute
  z-index 10
  top 50%
  left 50%
  margin-top -41px
  margin-left -115px
  width 230px
  background-color #fff
  border-radius 5px
  li
    padding 10px 15px
    &:first-child
      border-1px(#ddd)
</style>