<template>
  <div id="reader" styleName="reader">
    <transition name="top-nav">
      <top-nav v-show="bar" />
    </transition>
    <div styleName="read-container" :bg="bg_color" :night="bg_night">
      <div styleName="content" ref="content" :style="{'margin-top': curMigration + 'px'}" >
        <h4 styleName="title">{{title}}</h4>
        <div styleName="chapterContent" v-show="!loading" :style="{'font-size': fz_size + 'px'}">
          <p styleName="p" v-for="(c, i) in content" :key="i">{{c}}</p>
        </div>
        <div styleName="btn-bar" v-show="!loading">
          <ul styleName="btn-tab">
            <li styleName="pa-btn prev-btn" @click="prevChapter">上一章</li>
            <li styleName="pa-btn next-btn" @click="nextChapter">下一章</li>
          </ul>
        </div>
      </div>
    </div>
    <div styleName="page-up" @click="pageUp"></div>
    <div styleName="click-mask" @click="clickBar"></div>
    <div styleName="page-down" @click="pageDown"></div>
    <transition name="font-nav">
      <font-nav v-show="font_panel" />
    </transition>
    <transition name="bottom-nav">
      <bottom-nav v-show="bar" />
    </transition>
    <transition name="list-nav">
      <list-panel v-show="list_panel" :bookID="$route.params.id" @changeChapter="changeChapter" />
    </transition>
    <transition name="cover">
      <cover v-show="list_panel" />
    </transition>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import { mapState } from 'vuex'
import localEvent from '@/store/local'
import topNav from '../components/TopNav/TopNav'
import fontNav from '../components/FontNav/FontNav'
import bottomNav from '../components/BottomNav/BottomNav'
import listPanel from '../components/ListPanel/ListPanel'
import cover from '../components/Cover/Cover'

export default {
  mixins: [CSSModules()],
  components: {
    topNav, fontNav, bottomNav, listPanel, cover
  },
  data() {
    return {
      title: '',
      loading: true,
      content: [],
      maxH: 0,
      bookreaderinfo: {},
      curChapter: 1,
      curMigration: 0
    }
  },
  created() {
    // localStorage.clear()
    
    //判断本地是否存储了阅读器文字大小
    if (localEvent.StorageGetter('fz_size')) {
      this.$store.commit('fetchSize', localEvent.StorageGetter('fz_size'))
    }
    //判断本地是否存储了阅读器主题色
    if (localEvent.StorageGetter('bg_color')) {
      this.$store.commit('changeBgColor', localEvent.StorageGetter('bg_color')) 
    }
    //加载时从localStorage中回去所有数据阅读进度
    const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo')
    const id = this.$route.params.id

    this.bookreaderinfo = localBookReaderInfo || {}
    if (this.bookreaderinfo[id]) {
      this.curChapter = this.bookreaderinfo[id].chapter
      this.curMigration = this.bookreaderinfo[id].migration
    } else {
      this.saveBooksInfo()
    }
    this.getData()
  },
  computed: {
    ...mapState([
      'bar', 'font_panel', 'list_panel', 'bg_color', 'bg_night', 'fz_size'
    ])
  },
  methods: {
    getData(...arg) {
      const id = this.$route.params.id
      let chapter = arg[0] || this.curChapter
      this.$store.dispatch('getChapter', {
        params: {
          book: id, 
          id: chapter
        }
      }).then(res => {
        this.title = res.data.title
        this.content = res.data.content.split('-')
        this.loading = false
        this.$nextTick(() => {
          this.maxH = parseInt(window.getComputedStyle(this.$refs.content).height) - window.screen.height + 15
        })
      })
    },
    startScroll(target, speed) {
      let times = null
      let body = document.documentElement
      times = setInterval(() => {
        if (speed > 0) {
          if (body.scrollTop <= target) {
            body.scrollTop += speed 
          }
          if (body.scrollTop > target || body.scrollTop + window.screen.height >= body.scrollHeight) {
            clearInterval(times)
          }
        } else {
          if (body.scrollTop >= target) {
            body.scrollTop += speed
          }
          if (body.scrollTop < target || body.scrollTop <= 0) {
            clearInterval(times)
          }
        }
      }, 1)
    },
    // 上一章
    prevChapter() {
      if (this.curChapter <= 1) {
        return false
      }
      this.changeChapter(-- this.curChapter)
    },
    // 下一章
    nextChapter() {
      if (this.curChapter >= 50) {
        return false
      }
      this.changeChapter(++ this.curChapter)
    },
    changeChapter(chapter) {
      this.curChapter = chapter
      this.curMigration = 0
      this.getData()
      this.saveBooksInfo()
    },
    // 向上翻页
    pageUp() {
      this.pageFuc(() => {
        let target = this.curMigration + window.screen.height - 80
        return target >= 0 ? 0 : target
      })
      // this.startScroll(target, -20)
    },
    // 向下翻页
    pageDown() {
      this.pageFuc(() => {
        let target = this.curMigration - window.screen.height + 80
        return Math.abs(target) > this.maxH ? -this.maxH : target
      })
      // this.startScroll(target, 20)
    },
    // 翻页函数
    pageFuc(fn) {
      if (this.bar === true) {
        this.clickBar()
      } else {
        this.curMigration = fn()
        this.saveBooksInfo()
      }
    },
    // 切换上下工具栏，如果字体面板显示点击也关闭
    clickBar() {
      this.$store.commit('toggleBar')
      this.$store.commit('toggleFontPanel', false)
    },
    // 保存阅读记录
    saveBooksInfo() {
      const id = this.$route.params.id
      this.bookreaderinfo[id] = {
        book: id, 
        chapter: this.curChapter, 
        migration: this.curMigration
      }
      console.log(this.bookreaderinfo)
      localEvent.StorageSetter('bookreaderinfo', this.bookreaderinfo)
    }
  }
}
</script>

<style lang='stylus'>
@import '../assets/css/animate.css'
</style>

<style lang='stylus' module>
@import '../assets/stylus/global.styl'

bac($color)
  background-color $color

.reader
  .read-container
    box-sizing border-box
    overflow hidden
    padding 0 15px 15px
    height 100vh
    color #555
    line-height 31px
    min-height 600px
    .content
      .title
        line-height 50px
        font-size 20px
        color: #736357
        margin 0 15px
        letter-spacing 2px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .chapterContent
        .p
          text-indent 1em
          margin 0.5em 0
          text-align justify
          letter-spacing 0
          line-height 1.5
          &:first-of-type
            margin-top 0
      .btn-bar
        position relative
        z-index 15
        width 80%
        margin 20px auto 0
        max-width 800px
        .btn-tab
          display flex
          align-items center
          padding-left 0
          height 34px
          background-color #000
          border-radius 8px
          font-size 14px
          opacity 0.9
          .pa-btn
            display inline-block
            flex 1
            text-align center
            color: #fff
            &:nth-child(1)
              border-right 1px solid #858382
  .page-up
    position fixed
    top 0
    left 0
    width 35%
    height 100%
    color: rgba(0, 0, 0, .1)
    z-index 5
  .page-down
    position fixed
    top 0
    right 0
    width 35%
    height 100%
    color: rgba(0, 0, 0, .1)
    z-index 5
  .click-mask 
    position fixed
    top 0
    left 35%
    width 30%
    height 100%
    color rgba(0, 0, 0, .3)
  
  .read-container[bg='0'] 
    bac(#e9dfc7)
    .title 
      bac(#e9dfc7)
  .read-container[bg='1'] 
    bac(#e7eee5)
    .title 
      bac(#e7eee5)
  .read-container[bg='2'] 
    bac(#a4a4a4)
    .title 
      bac(#a4a4a4)
  .read-container[bg='3'] 
    bac(#cdefcd)
    .title 
      bac(#cdefcd)
  .read-container[bg='4'] 
    bac(#283548)
    .title
      bac(#283548)
  .read-container[bg='5']
    bac(#0f1410)
    .title
      bac(#0f1410)

  .read-container[night='true'] 
    bac(#0f1410)
    h4 
      bac(#0f1410)
</style>
