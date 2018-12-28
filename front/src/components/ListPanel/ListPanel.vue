<template>
  <div id="list-panel" styleName="list-panel" @touchmove:prevent>
    <div styleName="list">
      <mt-header styleName="list-nav" title="目录">
        <mt-button styleName="back" slot="left" icon='back' @click="hideListPanel"></mt-button>
      </mt-header>
      <div styleName="list-content" @touchmove:prevent>
        <ul>
          <li v-for="(item, index) in chapterList" :key="index" @click="jumpTo(index)">· {{index + 1}}. {{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapState } from 'vuex'

export default {
  mixins: [CSSModules()],
  props: {
    bookID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chapterList: []
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState([
      'list_panel'
    ])
  },
  methods: {
    getList() {
      this.$http('/titles', {
        params: {
          id: this.bookID
        }
      }).then(res => {
        this.chapterList = res.data.titles.split('-')
      })
    },
    jumpTo(i) {
      this.$store.commit('curChapter')
      this.$store.commit('toggleBar', false)
      this.hideListPanel()
      document.body.scrollTop = 0
    },
    hideListPanel() {
      this.$store.commit('toggleListPanel', false)
    }
  }
}
</script>

<style lang='stylus' module>
.list-panel
  position fixed
  left 0
  top 0
  bottom 0
  right 50px
  z-index 50
  overflow auto
  .list
    position absolute
    left 0
    top 0
    bottom 0
    width 100%
    background-color #fff
    .list-nav
      position fixed
      left 0
      right 50px
      height 50px
      line-height 50px
      background-color #fff
      color #ed424b
      border-bottom 1px solid #ed424b
      .back
        color #ed424b
    .list-content
      background-color #fff
      margin-top 50px
      ul
        padding 0 15px
      li
        color #333
        height 50px
        line-height 50px
        border-bottom 1px solid #ccc
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
</style>