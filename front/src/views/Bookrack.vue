<template>
  <div id="bookrack" styleName="bookrack">
    <div styleName="header">
      <span>书架</span>
    </div>
    <div styleName="book_u" v-for="(item, index) in bookrackInfo" :key="index" @touchstart="touchstart(item.id, index)" @touchmove="touchmove" @touchend="touchend(item.id)"> 
      <div styleName="book_image">
        <img :src="item.images" >
      </div>
      <div styleName="book_c">
        <div styleName="name">{{item.name}}</div>
        <div styleName="read">{{readRecord(item.id)}}</div>
      </div>
    </div>
    <rack-mask :flag="flag" :id="id" @cancelShadow="cancelShadow" @deleteBook="deleteBook" />
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import localEvent from '@/store/local'
import rackMask from '../components/RackMask/RackMask'

export default {
  mixins: [CSSModules()],
  components: {
    rackMask
  },
  data() {
    return {
      bookrackInfo: [],
      flag: false,
      id: 0,
      index: 0,
      timeOutEvent: null
    }
  },
  created() {
    const localBookrackInfo = localEvent.StorageGetter('bookrackInfo')
    console.log(localBookrackInfo)
    this.bookrackInfo = localBookrackInfo || []
  },
  computed: {
    bookreaderinfo() {
      const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo')
      return localBookReaderInfo || {}
    }
  },
  methods: {
    touchstart(id, i) {
      this.timeOutEvent = setTimeout(() => {
        this.flag = true
        this.id = id
        this.index = i
        this.timeOutEvent = null
      }, 400)
    },
    touchmove() {
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = null
    },
    touchend(id) {
      clearTimeout(this.timeOutEvent)
      if (this.timeOutEvent !== null) {
        this.$router.push('reader/' + id)
      }
      return false
    },
    readRecord(id) {
      return this.bookreaderinfo && this.bookreaderinfo[id] ? '阅读至' + this.bookreaderinfo[id].chapter + '章' : '您还未开始阅读'
    },
    cancelShadow() {
      this.flag = false
    },
    deleteBook() {
      this.flag = false
      this.bookrackInfo.splice(this.index, 1)
      localEvent.StorageSetter('bookrackInfo', this.bookrackInfo)
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
    width 100px
    margin 12px 12px 0
    .book_image
      width 100%
      height 134px
      overflow hidden
      img
        width 100%
    .book_c
      .name
        margin-top 3px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
        color: #000
      .read
        font-size 10px
        line-height 10px
        color: #999
</style>