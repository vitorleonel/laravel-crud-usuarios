<template>
	<div>
		<Navbar />

		<div class="container mx-auto mt-6">

			<UsersRegister />
			<UsersList />

		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import Navbar from '../../components/Navbar';
	import UsersList from './components/List';
	import UsersRegister from './components/Register';

	export default {
		name: 'Users',

		components: {
			Navbar,
			UsersList,
			UsersRegister,
		},
	}
</script>

