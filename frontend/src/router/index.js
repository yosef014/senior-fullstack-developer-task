import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import store from "../store/index.js";

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresRole: ['Admin'] },
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresRole: ['Editor', 'Admin'] },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const requiredRoles = to.meta.requiresRole

	if (!requiredRoles) return next()

	const userRoles = store.getters.roles
	const hasAccess = requiredRoles.some(role => userRoles.includes(role))

	if (hasAccess) {
		next()
	} else {
		next('/home')
	}
})

export default router
