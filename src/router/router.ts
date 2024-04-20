import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/pages/editor/Editor.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
