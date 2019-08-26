import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ui5-/];

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
