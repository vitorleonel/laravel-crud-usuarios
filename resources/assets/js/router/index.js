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
		component: LoginPage
	},
	{
		path: '/register',
		name: 'app.register',
		component: RegisterPage
	},
	{
		path: '/',
		name: 'app.home',
		component: HomePage
	},
	{
		path: '/users',
		name: 'app.users',
		component: UsersPage
	},
	{
		path: '/account',
		name: 'app.account',
		component: AccountPage
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
