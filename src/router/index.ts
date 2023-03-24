import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import ZIPSearchButton from '../components/pages/ZIPSearchPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search',
      component: ZIPSearchButton
    }
  ]
})

export default router
