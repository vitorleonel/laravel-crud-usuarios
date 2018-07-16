<template>
	<button :type="type" class="bg-white border border-blue hover:bg-blue-dark text-blue hover:text-white p-3 rounded" :class="{'shadow': shadow}" v-if="outlined">{{ text }}</button>
	<button :type="type" class="bg-red hover:bg-red-dark text-white p-3 rounded" :class="{'shadow': shadow}" v-else-if="danger">{{ text }}</button>
	<button :type="type" class="bg-blue hover:bg-blue-dark text-white p-3 rounded" :class="{'shadow': shadow}" v-else>{{ text }}</button>
</template>

<script>
	export default {
		props: {
			text: {
				required: true,
				type: String
			},
			type: {
				type: String,
				default: 'button'
			},
			outlined: {
				type: Boolean,
				default: false
			},
			danger: {
				type: Boolean,
				default: false
			},
			shadow: {
				type: Boolean,
				default: false
			}
		},
	}
</script>

