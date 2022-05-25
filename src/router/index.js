import { createRouter, createWebHistory } from 'vue-router';
import Index from '../navigation/dashboard/IndexNav.vue';
import Main from '../navigation/dashboard/main/MainNav.vue';
import Detail from '../navigation/dashboard/detail/DetailNav.vue';
import Setting from '../components/dashboard/setting/Setting.vue';
import Login from '../navigation/dashboard/user/LoginNav.vue';
import LoginForm from '../components/dashboard/user/LoginForm.vue';
import RegisterForm from '../components/dashboard/user/RegisterForm.vue';
import RegisterOauth from '@/components/dashboard/user/RegisterOauth.vue';
import Google from '../components/dashboard/user/oauth/Google.vue';
import Naver from '../components/dashboard/user/oauth/Naver.vue';
import Kakao from '../components/dashboard/user/oauth/Kakao.vue';
import api from '../api/api';

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: Index,
    meta: { auth: true },
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
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [
      {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm,
      },
      {
        path: '/register',
        name: 'RegisterForm',
        component: RegisterForm,
      },
      {
        path: '/oauth/register',
        name: 'RegisterOauth',
        component: RegisterOauth,
      },
      {
        path: '/login/oauth/google',
        name: 'GoogleOauth',
        component: Google,
      },
      {
        path: '/login/oauth/naver',
        name: 'NaverOauth',
        component: Naver,
      },
      {
        path: '/login/oauth/kakao',
        name: 'KakaoOauth',
        component: Kakao,
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth && api.getCookie('token') == undefined) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});

export default router;
