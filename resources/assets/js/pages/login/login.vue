<template>
  <div class="login">
    <form class="form" @submit.prevent="submitForm">
			<label for="email">E-mail</label>
      <input type="text" class="input" id="email" autofocus placeholder="seu e-mail">

			<label for="password">Senha</label>
      <input type="password" class="input" id="password" placeholder="sua senha">

      <button type="submit" class="button" :disabled="isLoading">
				{{ isLoading ? 'Aguarde...' : 'Entrar' }}
			</button>
    </form>
  </div>
</template>

<script>
  export default {
		name: 'Login',

		data() {
			return {
				isLoading: false,
			}
		},

		methods: {
			submitForm() {
				if(! this.preValidate()) {
					return;
				}

				this.isLoading = true;

				setTimeout(() => this.isLoading = false, 4000);
			},

			preValidate() {
				return true;
			},
		},
  }
</script>


<style lang="scss" scoped>
  @tailwind utilities;

  .login {
    @apply .w-screen .h-screen .bg-grey-light .flex .justify-center .items-center;

    .form {
      max-width: 400px;
      @apply .w-1/4 .bg-white .p-5 .rounded-lg .shadow;
    }
  }
</style>


