<template>
  <div id="booklist" styleName="booklist">
    <h2 styleName="title" @click="bookDetailId()">{{title}}</h2>
    <ul>
      <li v-for="(item, index) in datalist" :key="index">
        <router-link :to="{path: '/bookdetail/' + item.id}" @click.native="bookDetailId(item.id)">
          <div styleName="book-image">
            <img v-lazy="item.images" width="100%" height="100%">
          </div>
          <div styleName="book-detail">
            <h3>{{item.name}}</h3>
            <p>{{item.intro}}</p>
            <div styleName="author">
              <i></i>
              <span>{{item.author}}</span>
            </div>
            <div styleName="category">
              <span>{{item.type}}</span>
              <span>{{item.serialize}}</span>
              <span>{{item.wordcount}}万字</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  data() {
    return {
      typeArr: []
    }
  },
  props: ['datalist', 'title'],
  methods: {
    bookDetailId(id) {
      this.$store.commit('chooseBook', id)
    }
  },
  filters: {
    type(val) {
      return this.common.type(val)
    }
  }
}
</script>

<style lang='stylus' module>
@import '../../assets/stylus/global.styl'

.booklist
  margin-top 15px
  padding 15px
  background-color #fff
  .title
    margin-left 0
    margin-bottom 10px
    border-left 2px solid #ed424b
    text-indent 5px
    font-size 16px
    line-height 16px
  ul li
    display flex
    padding-bottom 15px
    margin-bottom 15px
    border-1px(#dddddd)
    &:last-child
      margin-bottom 0
      padding-bottom 0
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
        font-size 14px
        color #969ba3
        -webkit-line-clamp 2
        -webkit-box-orient vertical
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
          background url(@/assets/images/man.png) no-repeat
      .category
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