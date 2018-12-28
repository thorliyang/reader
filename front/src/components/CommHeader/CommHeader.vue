<template>
  <div id="header" styleName="header">
    <mt-header styleName="mt-header" fixed :title="title">
      <mt-button styleName="back" icon="back" slot="left" @click.native="toBack">返回</mt-button>
      <router-link styleName="home" class="fontsIcon icon-home" v-if="isHone" to="/" slot="right" />
    </mt-header>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    toBack() {
      history.go(-1)
    }
  },
  computed: {
    isHone() {
      return /(bookdetail|reader)/g.test(this.$route.path)
    }
  }
}
</script>

<style lang='stylus' module>
.header
  display relative
  height 50px
  background-color #ffffff
  .mt-header
    height 50px
    h1
      font-size 16px
    .home
      font-size 20px
</style>