import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/v-charts.js'

Vue.config.productionTip = false

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)

import mockData from '@/public/mock'
Vue.prototype.$screenData = mockData

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
