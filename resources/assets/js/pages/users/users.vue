<template>
	<div>
		<navbar />

		<div class="container mx-auto mt-6">
			<list />
		</div>
	</div>
</template>

<script>
	import Navbar from '../../components/Navbar';
	import List from './components/List';

	export default {
		name: 'Users',

		components: {
			Navbar,
			List
		},
	}
</script>

