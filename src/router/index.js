// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Lazy-loaded route components (loaded only when needed)
const HomePage = () => import('../views/HomePage.vue');
const PostDetail = () => import('../views/PostDetail.vue');
const NotFound = () => import('../views/NotFound.vue');

// Define all routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Home - Vue Router Blog'
    }
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    meta: {
      title: 'Post - Vue Router Blog'
    }
  },
  {
    path: '/post/slug/:slug',
    name: 'PostDetailBySlug',
    component: PostDetail,
    meta: {
      title: 'Post - Vue Router Blog'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404 - Page Not Found'
    }
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top when navigating to a new page
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Update page title on route change
router.beforeEach((to, from) => {
  document.title = to.meta.title || 'Vue Router Blog';
});

export default router;