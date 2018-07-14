<template>
  <div class="register">
    <form class="form" @submit.prevent="submitForm">
			<label for="name">Nome completo</label>
      <input type="text" class="input" id="name" autofocus placeholder="seu nome completo">

			<label for="email">E-mail</label>
      <input type="text" class="input" id="email" placeholder="seu e-mail">

			<label for="password">Senha</label>
      <input type="password" class="input" id="password" placeholder="sua senha">

			<label for="repassword">Confirmar senha</label>
      <input type="password" class="input" id="repassword" placeholder="confirmar sua senha">

      <button type="submit" class="button" :disabled="isLoading">
				{{ isLoading ? 'Aguarde...' : 'Cadastrar' }}
			</button>
    </form>
  </div>
</template>

<script>
  export default {
		name: 'Register',

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

  .register {
    @apply .w-screen .h-screen .bg-grey-light .flex .justify-center .items-center;

    .form {
      max-width: 400px;
      @apply .w-1/4 .bg-white .p-5 .rounded-lg .shadow;
    }
  }
</style>
