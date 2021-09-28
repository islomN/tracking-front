import Vue from 'vue'
import Router from 'vue-router';
import TokenService from "./services/TokenService";

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: () => import('./pages/Index'),
			name: 'dashboard'
		},
		{
			path: '/sign-in',
			component: () => import('./pages/SignIn'),
			name: 'sign-in',
			meta: {
				public: true,
				onlyWhenLoggedOut: true
			},
		}
	]
});

router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public);
	const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
	let hasToken = !!TokenService.getToken();

	if (!isPublic && !hasToken) {
		/*return next({
			name: 'login'
		})*/
	}

	if (hasToken && onlyWhenLoggedOut) {
		/*return next({
			name: 'transaction'
		})*/
	}

	next();
});

export default router;
