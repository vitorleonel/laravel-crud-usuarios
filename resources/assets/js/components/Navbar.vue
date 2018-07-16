<template>
	<header class="bg-white text-blue shadow py-6">
		<div class="container mx-auto flex justify-between items-center">

			<router-link :to="{ name: 'app.home' }" exact class="text-blue no-underline">
				<h1 class="text-xl">M2 Center</h1>
			</router-link>

			<div class="menu flex">
				<router-link class="text-grey-dark no-underline" :to="{ name: 'app.home' }" exact>Início</router-link>
				<router-link class="text-grey-dark no-underline" :to="{ name: 'app.users' }">Usuários</router-link>
				<router-link class="text-grey-dark no-underline" :to="{ name: 'app.account' }">Minha Conta</router-link>
				<router-link class="text-grey-dark no-underline" :to="{ name: 'app.account' }">Sair</router-link>
			</div>

		</div>
	</header>
</template>

<style lang="scss" scoped>
	@tailwind utilities;

	.menu {
		a {
			&:not(:last-child) {
				@apply .mr-6;
			}

			&:hover,
			&.router-link-active,
			&.router-link-exact-active {
				@apply .text-blue;
			}
		}
	}
</style>

