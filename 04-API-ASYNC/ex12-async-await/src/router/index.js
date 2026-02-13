import { createRouter, createWebHistory } from 'vue-router'
import WeatherDashboard from '../components/WeatherDashboard.vue'
import AdvancedAsyncDemo from '../components/AdvancedAsyncDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/weather' },
    { path: '/weather', name: 'weather', component: WeatherDashboard },
    { path: '/async-demo', name: 'async-demo', component: AdvancedAsyncDemo }
  ]
})

export default router