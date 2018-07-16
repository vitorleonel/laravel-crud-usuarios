<template>
	<div class="flex -mx-4">
		<list-item v-for="item in items" :key="item.id" :item="item" />
	</div>
</template>

<script>
	import ListItem from './ListItem';

	export default {
		components: {
			ListItem
		},

		data() {
			return {
				items: [
					{
						id: 1,
						name: 'Vitor Leonel',
						email: 'falecom@vitorleonel.com',
						image: 'https://tailwindcss.com/img/card-top.jpg'
					},
					{
						id: 2,
						name: 'Amanda Queiroz',
						email: 'amanda120795@hotmail.com',
						image: 'https://tailwindcss.com/img/card-top.jpg'
					},
				],
			}
		},
	}
</script>

