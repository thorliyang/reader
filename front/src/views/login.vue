<template>
  <div id="login" styleName="login">

  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'

export default {
  mixins: [CSSModules()],
  created() {
    this.axios.post('/user/login', {
      username: 'liyang',
      password: 123456
    }).then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token)
    })
  }
}
</script>

<style lang='stylus' module>

</style>