<template>
  <div id="similar" styleName="similar" @click="toBookDetail(bookDetail.id)">
    <div styleName="image">
      <img v-lazy="bookDetail.images" @error="loadImage" width="100%" height="100%">
    </div>
    <p styleName="title">{{bookDetail.name}}</p>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  props: {
    like: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bookDetail: {}
    }
  },
  created() {
    this.getBookDetail(this.like)
  },
  methods: {
    getBookDetail(id) {
      this.$http('/booklist', {
        params: { id }
      }).then((res) => {
        this.bookDetail = res.data
      })
    },
    toBookDetail(id) {
      this.$router.push({path: '/bookdetail/' + id})
      document.body.scrollTop = 0
    },
    loadImage(e) {
      this.common.defaultImage(e)
    }
  },
  watch: {
    like(val) {
      this.getBookDetail(val)
    }
  }
}
</script>

<style lang='stylus' module>
.similar
  width 110px
  height 165px
  .image
    height 140px
    img[src=""]
      opacity 0
  .title
    margin-top 5px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-align center
</style>