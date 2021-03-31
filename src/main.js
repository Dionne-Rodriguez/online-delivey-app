  import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
  import { firestorePlugin }from 'vuefire'

//STYLING
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false





  Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
