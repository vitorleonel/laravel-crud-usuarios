<template>
	<div class="w-1/4 px-4">

		<div class="bg-white shadow rounded flex items-center p-4 border-b-2 border-transparent cursor-pointer hover:border-grey">
			<img class="w-12 h-12 rounded-full border-2 border-grey mr-4" :src="item.image" :alt="item.name">

			<div class="flex flex-col">
				<span class="leading-none mb-2">{{ item.name }}</span>
				<span href="" class="text-xs text-grey-dark">{{ item.email }}</span>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: ['item']
	}
</script>


<style lang="scss" scoped>

</style>
