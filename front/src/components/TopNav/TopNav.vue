<template>
  <div id="top-nav" styleName="top-nav">
    <mt-header styleName="mt-header">
      <router-link to="/bookrack" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapState } from 'vuex'

export default {
  mixins: [CSSModules()],
  computed: {
    ...mapState([
      'bar'
    ])
  }
}
</script>

<style lang='stylus' module>
.top-nav
  position fixed
  top 0
  z-index 20
  height 50px
  width 100%
  .mt-header
    height 100%
    background-color #000
</style>