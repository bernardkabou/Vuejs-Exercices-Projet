import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '../views/PostsList.vue'
import PostDetail from '../views/PostDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import EditPost from '../views/EditPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/posts' },
    { path: '/posts', name: 'posts', component: PostsList },
    { path: '/posts/new', name: 'create-post', component: CreatePost },
    { path: '/posts/:id', name: 'post-detail', component: PostDetail, props: true },
    { path: '/posts/:id/edit', name: 'edit-post', component: EditPost, props: true }
  ]
})

export default router