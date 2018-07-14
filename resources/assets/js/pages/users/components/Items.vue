<template>
	<div>
		<item v-for="item in items" :key="item.id" />
	</div>
</template>

<script>
	import Item from './Item';

	export default {
		components: {
			Item
		},

		data() {
			return {
				items: [
					{
						id: 1,
					},
					{
						id: 2,
					}
				],
			}
		},
	}
</script>

