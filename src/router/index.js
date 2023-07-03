import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/auth/LoginView.vue";
import ProfileView from "@/views/samples/FormServerValidation.vue";
import useToken from "@/compositions/useToken";
import useAuthUser from "@/compositions/useAuthUser";
const requireAuth = (to, from, next) => {
  const {getToken} = useToken();
  const {getAuthUser} = useAuthUser();
  let token = getToken();
  let user = getAuthUser();
  if (!user.value || !token.value) {
    next({name: 'login'});
    return
  }

  next();
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
  ]
})

export default router
