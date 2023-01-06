import { createRouter, createWebHistory } from "vue-router";

import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import Home from "../pages/Home.vue";

const routes = [  {
  path: "/auth",
  name: "SignUp",
  component: SignUp,
},
{
  path: "/signin",
  name: "SignIn",
  component: SignIn,
},
{
  path: "/",
  name: "Home",
  component: Home,
}];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
