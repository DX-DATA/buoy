import { createRouter, createWebHistory } from 'vue-router';
import Index from '../navigation/dashboard/IndexNav.vue';
import Main from '../navigation/dashboard/main/MainNav.vue';
import Detail from '../navigation/dashboard/detail/DetailNav.vue';
import Setting from '../components/dashboard/setting/Setting.vue';
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
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

export default router;
