import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BlogListView from '../views/BlogListView.vue'
import BlogPostView from '../views/BlogPostView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import DashboardLayout from '../views/dashboard/DashboardLayout.vue'
import DashboardOverview from '../views/dashboard/DashboardOverview.vue'
import DashboardSettings from '../views/dashboard/DashboardSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    { path: '/blog', name: 'blog', component: BlogListView },

    {
      path: '/blog/:id',
      name: 'blog-post',
      component: BlogPostView,
      props: true
    },

    { path: '/about', name: 'about', component: AboutView },

    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfileView,
      props: true
    },

    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter: () => {
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        if (!isAuthenticated) {
          alert('Please login to access dashboard')
          return { name: 'home' }
        }
      },
      children: [
        { path: '', redirect: '/dashboard/overview' },
        {
          path: 'overview',
          name: 'dashboard-overview',
          component: DashboardOverview
        },
        {
          path: 'settings',
          name: 'dashboard-settings',
          component: DashboardSettings
        }
      ]
    },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  console.log(`Navigating from ${from.path} to ${to.path}`)
})

export default router