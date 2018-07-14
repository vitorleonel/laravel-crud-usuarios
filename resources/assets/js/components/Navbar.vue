<template>
	<header class="navbar">
		<div class="container">

			<router-link :to="{ name: 'app.home' }" exact class="brand">
				<h1 class="text-xl">M2 Center</h1>
			</router-link>

			<div class="menu">
				<router-link :to="{ name: 'app.home' }" exact>Início</router-link>
				<router-link :to="{ name: 'app.users' }">Usuários</router-link>
				<router-link :to="{ name: 'app.account' }">Minha Conta</router-link>
				<router-link :to="{ name: 'app.account' }">Sair</router-link>
			</div>

		</div>
	</header>
</template>

<style lang="scss" scoped>
	@tailwind utilities;

	.navbar {
		@apply .bg-blue .text-white .shadow .py-6;

		.container {
			@apply .mx-auto .flex .justify-between .items-center;
		}

		.brand {
			@apply .text-white .no-underline;
		}

		.menu {
			@apply .flex;

			a {
				@apply .text-white .no-underline .antialiased;

				&:not(:last-child) {
					@apply .mr-6;
				}

				&:hover,
				&.router-link-active,
				&.router-link-exact-active {
					@apply .underline;
				}
			}
		}
	}
</style>

