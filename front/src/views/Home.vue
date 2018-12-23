<template>
  <div id="home" styleName="home">
    <nav styleName="nav-header">
      <header>
        <a href="/" styleName="brand">移动书城</a>
        <a href="/" styleName="avatar"></a>
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
    <div>
      <recommend :booklist="booklist | hot" title="热门小说" />
      <recommend :booklist="booklist | top" title="排行榜" />
      <recommend :booklist="booklist | free" title="限时免费" />
      <book-list :datalist="booklist | newbook" title="新书抢鲜" />
      <book-list :datalist="booklist | endbook" title="畅销完本" />
      <book-list :datalist="booklist | like" title="猜你喜欢" />
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import recommend from '../components/Common/Recommend'
import bookList from '../components/Common/BookList'

export default {
  mixins: [CSSModules()],
  components: {
    recommend, bookList
  },
  data () {
    return {
      booklist: [],
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
    this.getData()
  },
  filters: {
    hot(arrayList) {
      return arrayList.filter((item, index) => {
        return index < 20 && index % 2 === 1
      })
    },
    top(arrayList) {
      return arrayList.filter((item, index) => {
        return index < 20 && index % 2 === 0
      })
    },
    free(arrayList) {
      return arrayList.filter((item, index) => {
        return index < 20 && index % 3 === 2
      })
    },
    newbook(arrayList) {
      return arrayList.filter((item, index) => {
        return index < 20 && index % 3 === 2
      }).splice(0, 3)
    },
    endbook(arrayList) {
      return arrayList.filter((item) => {
        return item.serialize === '完本' && item.ratings >= 4
      }).splice(0, 5)
    },
    like(arrayList) {
      return arrayList.filter((item, index) => {
        return index % 4 === 2
      }).splice(0, 3)
    }
  },
  methods: {
    getData() {
      this.$http('/booklist')
        .then((res) => {
          this.booklist = res.data
        })
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
      font-size 20px
      text-indent -8888px
      .brand 
        display block
        width 100px
        background url(http://qidian.gtimg.com/qdm/img/logo-qdm.0.50.svg) no-repeat left
      .avatar
        width 24px
        height 24px
        background url(../assets/images/avatar.png) no-repeat center
        background-size 100%
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