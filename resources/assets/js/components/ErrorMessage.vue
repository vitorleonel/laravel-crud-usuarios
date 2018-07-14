<template>
	<div class="bg-red text-white rounded-lg p-3 mb-5" v-if="error">{{ error }}</div>
</template>

<script>
	export default {
		name: 'ErrorMessage',

		props: ['error'],
	}
</script>

