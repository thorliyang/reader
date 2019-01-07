<template>
  <div id="tabbar" styleName="tabbar">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div styleName="tab">
      <div styleName="tab_item" v-for="(c, i) in itemData" :key="i" :class="classIsSelected(c.type)" @click="selectedOperation(c.type)">
        <div styleName="tab_item_icon">
          <img :src="c.images" >
        </div>
        <div styleName="tab_item_label">{{c.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  data() {
    return {
      selected: 'home',
      itemData: [
        {
          title: '首页',
          images: require('@/assets/images/home.png'),
          type: 'home'
        },
        {
          title: '书架',
          images: require('@/assets/images/bookrack2.png'),
          type: 'bookrack'
        }
      ]
    }
  },
  created() {
    this.selected = this.$route.path.replace(/\//g, '')
  },
  computed: {
    classIsSelected() {
      return function(type) {
        return type === this.selected ? this.$style['is_selected'] : ''
      }
    }
  },
  methods: {
    selectedOperation(path) {
      this.$router.push(path)
    }
  },
  watch: {
    $route() {
      this.selected = this.$route.path.replace(/\//g, '')
    }
  }
}
</script>

<style lang='stylus' module>
.tabbar
  padding-bottom 55px
  .tab
    display: flex   
    position fixed
    right 0
    bottom 0
    left 0
    z-index 1
    text-align center
    background-color #fff
    .tab_item
      display block
      padding 7px 0
      flex 1
      text-decoration none
      color #777
      &.is_selected
        background-color #eaeaea
        color #000
      .tab_item_icon
        width 24px
        height 24px
        margin 0 auto 5px
        & > * 
          display block
          width 100%
          height 100%
      .tab_item_label 
        color inherit
        font-size 12px
        line-height: 1
</style>