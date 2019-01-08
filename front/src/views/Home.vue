<template>
  <div id="home" styleName="home">
    <nav styleName="nav-header">
      <header>
        <span styleName="brand">移动书城</span>
      </header>
      <div styleName="swipe">
        <mt-swipe :auto="5000">
          <mt-swipe-item v-for="(item, index) in type" :key="index">
            <img :src="imageLinks(item.num)" ref="swipe_img" width="100%" height="100%">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </nav>
    <nav styleName="home-nav">
      <router-link 
        styleName="guide-nav-div"
        v-for="(item, index) in type"
        :key="index"
        :to="{path: 'category', query: {type: item.num}}"
      >
        <i styleName="icon icon-sort"></i>
        <h4 styleName="guide-nav-h">{{item.word}}</h4>
      </router-link>
    </nav>
    <div styleName="referrals">
      <recommend :booklist="hotbook" title="热门小说" />
      <recommend :booklist="topbook" title="排行榜" />
      <recommend :booklist="freebook" title="限时免费" />
      <book-list :datalist="newbook" title="新书抢鲜" />
      <book-list :datalist="endbook" title="畅销完本" />
      <book-list :datalist="likebook" title="猜你喜欢" />
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapGetters } from 'vuex'
import recommend from '../components/Common/Recommend'
import bookList from '../components/Common/BookList'

export default {
  mixins: [CSSModules()],
  components: {
    recommend, bookList
  },
  data () {
    return {
      type: [
        {
          num: 1,
          word: '玄幻'
        },
        {
          num: 2,
          word: '修真'
        },
        {
          num: 3,
          word: '都市'
        },
        {
          num: 4,
          word: '历史'
        },
        {
          num: 5,
          word: '游戏'
        }
      ]
    }
  },
  created() {
    this.fetchBooklist()
  },
  computed: {
    ...mapGetters([
      'hotbook', 'topbook', 'freebook', 'newbook', 'endbook', 'likebook'
    ])
  },
  methods: {
    fetchBooklist() {
      this.$store.dispatch('getBooklist')
    },
    imageLinks (index) {
      return require("../assets/images/" + index + ".jpg")
    }
  },
}

</script>
<style lang='stylus' module>
.home
  background-color #f6f7f9
  .nav-header
    header
      display flex
      height 45px
      padding 0 15px
      justify-content space-between
      align-items center
      font-size 16px
      font-family 'Arial, Helvetica, sans-serif'
    .swipe
      height 3.05rem
  .home-nav
    display flex
    padding 10px 0
    margin 10px 0
    background-color #fff
    .guide-nav-div 
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
      i 
        width 26px
        height 26px
        background-image url(../assets/images/sprite.0.50.png)
      h4
        font-weight normal
        margin-top 2px
      &:nth-of-type(1)
        i
          width 24px
          background-position -63px -28px
      &:nth-of-type(2)
        i
          background-position 0 0
      &:nth-of-type(3)
        i
          background-position 0 -30px
      &:nth-of-type(4)
        i
          width 24px
          background-position 0 -60px
      &:nth-of-type(5)
        i
          background-position -30px -30px
</style>