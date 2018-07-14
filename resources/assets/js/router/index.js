import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';
import HomePage from '../pages/home/home';
import UsersPage from '../pages/users/users';
import AccountPage from '../pages/account/account';

const routes = [
	{
		path: '/login',
		name: 'app.login',
		component: LoginPage,
		meta: {
			requiredAuth: false,
		},
	},
	{
		path: '/register',
		name: 'app.register',
		component: RegisterPage,
		meta: {
			requiredAuth: false,
		},
	},
	{
		path: '/',
		name: 'app.home',
		component: HomePage,
		meta: {
			requiredAuth: true,
		},
	},
	{
		path: '/users',
		name: 'app.users',
		component: UsersPage,
		meta: {
			requiredAuth: true,
		},
	},
	{
		path: '/account',
		name: 'app.account',
		component: AccountPage,
		meta: {
			requiredAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	if(! to.meta.requiredAuth) {
		next();
	} else {
		const authenticate = JSON.parse(window.localStorage.getItem('m2center::authenticate'));

		if(! authenticate) {
			next({ name: 'app.login' });
		}

		next();
	}
});

export default router;
