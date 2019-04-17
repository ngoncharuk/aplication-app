import Vue from 'vue'
import moment from 'vue-moment'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(moment)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.onReady(() => {
  store.dispatch('connectWebSocket', "ws://machinestream.herokuapp.com/api/v1/events");
});
