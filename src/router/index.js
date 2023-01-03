import { createRouter, createWebHistory } from "vue-router";

const routes = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
