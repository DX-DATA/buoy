import { createRouter, createWebHistory } from 'vue-router';
import Index from '../navigation/dashboard/IndexNav.vue';
import Main from '../navigation/dashboard/main/MainNav.vue';
import Detail from '../navigation/dashboard/detail/DetailNav.vue';

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: Index,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main,
      },
      {
        path: '/detail',
        name: 'Detail',
        component: Detail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
