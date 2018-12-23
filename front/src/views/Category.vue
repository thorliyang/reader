<template>
  <div id="category" styleName="category">
    <nav-header :title="title" />
    <div styleName="category-content">
      <div styleName="category-list">
        <mt-loadmore 
          styleName="loadmore"
          :bottom-method="loadBottom" 
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
          v-if="!LoadingEnter"
        >
          <li v-for="(item, index) in categoryList" :key="index">
            <router-link :to="{path: '/bookdetail/' + item.id}" @click.native="bookDetailId(item.id)">
              <div styleName="book-image">
                <img v-lazy="item.images" width="100%" height="100%">
              </div>
              <div styleName="book-detail">
                <h3>{{item.name}}</h3>
                <p>{{modifierIntro(item.intro)}}</p>
                <div styleName="author">
                  <i></i>
                  <span>{{item.author}}</span>
                </div>
                <div styleName="category-r">
                  <span>{{item.ratings}}</span>
                  <span>{{item.serialize}}</span>
                  <span>{{item.wordcount}}万字</span>
                </div>
              </div>
            </router-link>
          </li>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { Indicator } from 'mint-ui'
import navHeader from '../components/NavHeader/NavHeader'

const count = 10
let begin = 0

export default {
  mixins: [CSSModules()],
  components: {
    navHeader
  },
  data() {
    return {
      categoryList: [],
      LoadingEnter: true,
      allLoaded: false
    }
  },
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'triple-bounce'
    })
    this.$nextTick().then(() =>{
      this.getCategory(this.$route.query.type, () => {
        this.LoadingEnter = false
        Indicator.close()
      })
    })
  },
  computed: {
    title() {
      let type = parseInt(this.$route.query.type)
      return this.common.type(type)
    }
  },
  methods: {
    getCategory(type, fn) {
      this.$http('/type', {
        params: {
          type, begin, count
        }
      }).then((res) => {
        if (res.data.length === 0) {
          this.allLoaded = true
          this.$refs.loadmore.onBottomLoaded()
          return false
        }
        this.categoryList = this.categoryList.concat(res.data)
        begin += 10
        fn()
      })
    },
    modifierIntro(intro) {
      return intro.replace(/(=|—)+/g, '').trim()
    },
    loadBottom() {
      this.getCategory(this.$route.query.type, () => {
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    bookDetailId(id) {
      this.$store.dispatch('chooseBook', id)
    }
  },
}

</script>
<style lang='stylus' module>
@import '../assets/stylus/global.styl'

.category 
  position relative
  min-height 100vh
  background-color #f6f7f9
  .category-content
    position relative
    .category-list
      padding 0 15px
      overflow auto
      height calc(100vh - 50px)
      -webkit-overflow-scrolling touch
      background-color #fff
      .loadmore 
        li
          display flex
          padding 15px 0
          border-1px(#dddddd)
          &:nth-last-of-type(1)
            border-none()
          a
            display flex
          .book-image 
            width 80px
            height 100px
            img 
              vertical-align top
          .book-detail
            position relative
            flex 1
            padding 0
            margin-left 20px
            h3 
              font-size 18px
              margin-bottom 10px
            p
              overflow hidden
              text-overflow ellipsis
              display -webkit-box
              line-clamp 2
              -webkit-line-clamp 2
              -webkit-box-orient vertical
              font-size 14px
              color #969ba3
            .author
              position absolute
              left 0
              bottom 5px
              color #969ba3
              font-size 13px
              i 
                position relative
                bottom -3px
                display inline-block
                width 16px
                height 16px
                background url(../assets/images/man.png) no-repeat
            .category-r
              position absolute
              right 0
              bottom 5px
              float right
              color #969ba3
              font-size 10px
              span 
                border 1px solid #cccccc
                border-radius 2px
                padding 0 2px
              span:nth-child(2)
                color #ed424b
</style>    