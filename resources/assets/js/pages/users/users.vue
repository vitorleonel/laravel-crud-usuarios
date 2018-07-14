<template>
	<div>
		<navbar />

		<div class="container mx-auto mt-6">
			<items />
		</div>
	</div>
</template>

<script>
	import Navbar from '../../components/Navbar';
	import Items from './components/Items';

	export default {
		name: 'Users',

		components: {
			Navbar,
			Items
		},
	}
</script>

