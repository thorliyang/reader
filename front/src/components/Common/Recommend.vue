<template>
  <div id="recommend" styleName="recommend">
    <h2 styleName="title">{{title}}</h2>
    <div styleName="list">
      <ul styleName="list-ul">
        <li styleName="list-li" v-for="(item, index) in booklist" :key="index">
          <router-link :to="{path: '/bookdetail/'+ item.id}" @click.native="bookDetailId(item.id)">
            <img v-lazy="item.images">
            <p styleName="book-name">{{item.name}}</p>
            <p styleName="book-author">{{item.author}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  props: ['title', 'booklist'],
  methods: {
    bookDetailId(id) {
      this.$store.dispatch('chooseBook', id)
    }
  }
}
</script>

<style lang='stylus' module>
.recommend
  padding-top 15px
  margin-bottom 15px
  background-color #fff
  .title
    margin 0 0 10px 15px
    border-left 2px solid #ed424b
    text-indent 5px
    font-size 16px
    line-height 16px
  .list
    font-size 0
    .list-ul
      &::-webkit-scrollbar 
        display none
      position relative
      overflow-x auto 
      overflow-y hidden
      white-space nowrap
      margin-left 8px
      .list-li
        display inline-block
        margin-right 8px
        width 100px
        img 
          width 100%
          height 125px
        p
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          &.book-name
            font-size 14px
          &.book-author
            font-size 12px
</style>