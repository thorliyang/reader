import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Common from '@/assets/js/utils'
import '@/assets/js/remark'
import '@/assets/css/reset.css'
require('animate.css')

Vue.use(Common)
Vue.use(MintUI)

// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
