import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooterCustom from "./layout/AppFooterCustom";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Collection from "./views/Collection.vue";
import Admin from "./views/Admin.vue";
import Api from "./views/Api.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/dev",
      name: "dev",
      components: {
        header: AppHeader,
        default: Api,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: false },
    },
    {
      path: "/admin",
      name: "admin",
      components: {
        header: AppHeader,
        default: Admin,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: true },
    },
    {
      path: "/collection",
      name: "collection",
      components: {
        header: AppHeader,
        default: Collection,
        footer: AppFooterCustom,
      },
      meta: { requiresAuth: false },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    // 需要登录但未登录，重定向到登录页
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    // 已登录但访问登录或注册页，重定向到数据采集页
    next({ path: '/collection' });
  } else {
    next();
  }
});

export default router;
