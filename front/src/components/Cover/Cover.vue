<template>
  <div id="bg-cover" class="bg-cover" @touchmove.prevent @click="hideListPanel"></div>
</template>

<script>

export default {
  methods: {
    hideListPanel() {
      this.$store.commit('toggleListPanel', false)
    }
  }
}
</script>

<style lang='stylus'>
.bg-cover 
  position: fixed
  top 0
  left 0
  bottom 0
  right 0
  opacity 1
  z-index 10
  background-color: rgba(0,0,0,.5)
</style>