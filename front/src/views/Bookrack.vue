<template>
  <div id="bookrack" styleName="bookrack">
    <div styleName="header">
      <span>书架</span>
    </div>
    <div styleName="book_u" :class="classBookType" v-for="(item, index) in bookrackInfo" :key="index">
      <div styleName="book_image">
        <img :src="item.images" >
      </div>
      <div styleName="book_c">
        <div styleName="name">{{item.name}}</div>
        <div styleName="read">{{readRecord(item.id)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import localEvent from '@/store/local'

export default {
  mixins: [CSSModules()],
  data() {
    return {
      type: 0
    }
  },
  computed: {
    bookrackInfo() {
      const localBookrackInfo = localEvent.StorageGetter('bookrackInfo')
      console.log(localBookrackInfo)
      return localBookrackInfo ? localBookrackInfo : {}
    },
    bookreaderinfo() {
      const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo')
      return localBookReaderInfo ? localBookReaderInfo : {}
    },
    classBookType() {
      return this.type === 0 ? this.$style['book_across'] : this.$style['book_vertical']
    }
  },
  methods: {
    readRecord(id) {
      return this.bookreaderinfo && this.bookreaderinfo[id] ? '阅读至' + this.bookreaderinfo[id].chapter + '章' : '您还未开始阅读'
    }
  }
}
</script>

<style lang='stylus' module>
.bookrack
  display flex
  flex-wrap wrap 
  justify-content flex-start
  .header
    width 100%
    height 45px
    line-height 45px
    background-color #fff
    text-align center
    span
      font-family Microsoft YaHei
      font-size 16px
  .book_u
    &.book_across
      width 100px
      margin 12px 12px 0
      .book_image
        width 100%
        img
          width 100%
      .book_c
        .name
          font-size 14px
          color: #000
        .read
          font-size 10px
          line-height 10px
          color: #999
</style>