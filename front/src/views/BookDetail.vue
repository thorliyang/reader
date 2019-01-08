<template>
  <div id="book-detail" styleName="book-detail">
    <comm-header title="图书详情" />
    <div styleName="detail-linear">
      <div styleName="detail-con">
        <div styleName="detail-image">
          <img :src="bookDetail.images" @error="defaultImge" width="100%" />
        </div>
        <div styleName="detail-main">
          <h3 styleName="name">{{bookDetail.name}}</h3>
          <p styleName="author">作者：{{bookDetail.author}}</p>
          <p styleName="type">分类：{{bookDetail.type}}</p>
          <p styleName="wordcount">{{bookDetail.wordcount}}万字</p>
          <ratings :score="bookDetail.ratings" />
        </div>
      </div>
      <div styleName="read-btn">
        <div styleName="bookcase">
          <mt-button type="danger" @click="addBookcase">
            <a>加入书架</a>
          </mt-button>
        </div>
        <div styleName="reading">
          <router-link :to="{path:'/reader/'+ bookDetail.id}">
            <mt-button type="default" @click="openBook">开始阅读</mt-button>
          </router-link>
        </div>
      </div>
      <div>
        <div styleName="detail-intro">
          <p :class="introShow" @click="showmore = !showmore">{{bookDetail.intro}}</p>
        </div>
        <div styleName="detail-tag">
          <h3 styleName="title">类别标签</h3>
          <ul styleName="tag-btn">
            <li>{{bookDetail.type}}</li>
            <li>东方玄幻</li>
          </ul>
        </div>
        <div styleName="detail-like">
          <h3 styleName="title">喜欢本书的人还喜欢</h3>
          <ul styleName="like-list">
            <li v-for="(item,index) in likes" :key="index">
              <similar :like="item" :key="index"></similar>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import localEvent from '@/store/local'
import commHeader from '../components/CommHeader/CommHeader'
import ratings from '../components/Ratings/Ratings'
import similar from '../components/Similar/Similar'

export default {
  mixins: [CSSModules()],
  components: {
    commHeader, ratings, similar
  },
  data() {
    return {
      bookrack: {},
      likes: [],  //相似推荐
      showmore: false, //简介显示更多
      bookrackInfo: []
    }
  },
  created() {
    this.getBookDetail()
  },
  computed: {
    ...mapState([
      'bookDetail'
    ]),
    introShow() {
      return !this.showmore ? this.$style['show5'] : ''
    }
  },
  methods: {
    getBookDetail() {
      const id = this.$route.params.id
      this.$store.dispatch('getBookDetail', {
        params: { id },
        callback: (data) => {
          this.likes = data.like.split('-')
        }
      })
    },
    addBookcase() {
      const id = this.$route.params.id
      const localBookrackInfo = localEvent.StorageGetter('bookrackInfo')

      this.bookrackInfo = localBookrackInfo || []
      
      if (this.isRepeat(this.bookrackInfo, id)) {
        Toast({
          message: '已收藏，可在书架中阅读',
          position: 'bottom',
          duration: 1000
        })
      } else {
        Toast({
          message: '收藏成功',
          position: 'bottom',
          duration: 1000
        })
        this.bookrackInfo.unshift(this.bookDetail)
        localEvent.StorageSetter('bookrackInfo', this.bookrackInfo)
      }
    },
    openBook() {},
    defaultImge(e) {
      this.common.defaultImage(e)
    },
    isRepeat(arr, id) {
      return arr.map(item => {
        return item.id
      }).indexOf(Number(id)) !== -1
    }  
  },
  watch: {
    '$route'() {
      this.getBookDetail()
    }
  }
}
</script>

<style lang='stylus' module>
@import '../assets/stylus/global.styl'

ell()
  text-overflow ellipsis
  overflow hidden
  white-space nowrap

.book-detail
  // padding 0 20px
  .detail-linear
    padding 0 20px
    background -webkit-linear-gradient(bottom, #fff, rgba(255, 255, 255, 0) 108px) no-repeat center bottom
    background linear-gradient(to top, #fff, rgba(255, 255, 255, 0) 8rem) no-repeat center bottom
    .detail-con
      display flex
      padding 15px 0 18px
      .detail-image
        width 100px
        margin-right 25px
      .detail-main
        flex 1
        .name
          font-size 18px
          line-height 1.5
          ell()
        p
          font-size 14px
          line-height 1.8
          ell()
    .read-btn
      display flex
      border-1px(#ddd)
      > div
        flex 1
        padding-bottom 20px
        &:first-child 
          margin-right 15px;
        button
          display block
          margin 0 auto
          width 100%
          height 33px
          line-height 33px
          font-size 15px
          vertical-align middle
          border none
          border-radius 3px
        &.bookcase
          button 
            background-color #ed424b
            a 
              color #fff
        &.reading
          button 
            color #333
            background-color #fff
    .detail-intro
      padding 20px 0
      font-size 14px
      text-indent 2em
      line-height 1.6
      border-1px(#ddd)
      p.show5
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        line-clamp 5
        -webkit-line-clamp 5
        -webkit-box-orient vertical
    .detail-tag
      padding 20px 0
      border-1px(#ddd)
      .title
        font-size 14px
        margin-bottom 10px
      .tag-btn li
        display inline-block
        padding 3px 10px
        margin-right 10px
        color #333
        border 1px solid #ccc
        border-radius 5px
    .detail-like 
      padding 20px 0
      .title 
        font-size 14px
        margin-bottom 20px
      .like-list 
        display flex
        li 
          flex 1
</style>