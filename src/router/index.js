import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import authRoutes from "@/modules/auth/router";
import empRoutes from "@/modules/employee/router";
import { useStore } from "vuex";

const routes = [
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  ...authRoutes,
  ...empRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.isLoggedIn) {
      next();
    } else {
      alert("Please login first");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
