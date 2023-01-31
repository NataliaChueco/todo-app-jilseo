import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";

const routes = [
	{
		path: "/",
		redirect: "/signup",
	},
	{
		path: "/signup",
		name: "SignUp",
		component: SignUp,
	},
	{
		path: "/signin",
		name: "SignIn",
		component: SignIn,
	},
	{
		path: "/dashboard",
		name: "Home",
		component: Home,
	},
];

/* const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});
 */
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	base: import.meta.env.BASE_URL,
	routes,
});
export default router;
