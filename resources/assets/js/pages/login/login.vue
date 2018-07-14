<template>
  <div class="login">
    <form class="form" @submit.prevent="submitForm">
			<error-message :error="errorMessage" />

			<label for="email">E-mail</label>
      <input type="email" class="input" id="email" autofocus placeholder="seu e-mail" required v-model="form.email">

			<label for="password">Senha</label>
      <input type="password" class="input" id="password" placeholder="sua senha" required v-model="form.password">

      <button type="submit" class="button" :disabled="isLoading">
				{{ isLoading ? 'Aguarde...' : 'Entrar' }}
			</button>
    </form>
  </div>
</template>

<script>
	import ErrorMessage from '../../components/ErrorMessage';
	import api from '../../services/api';

  export default {
		name: 'Login',

		components: {
			ErrorMessage,
		},

		data() {
			return {
				isLoading: false,
				errorMessage: '',

				form : {
					email: '',
					password: '',
				}
			}
		},

		methods: {
			async submitForm() {
				if(! this.preValidate()) {
					return;
				}

				this.isLoading = true;
				this.clearErrorMessage();

				try {
					const { status, data } = await api.post('/authenticate', this.form);

					if(status === 200) {
						this.saveToLocalStorage(data);
						this.$router.push({ name: 'app.home' });
					} else {
						this.setErrorMessage('Houve um erro, tente novamente!');
					}
				} catch (error) {
					const { status } = error.response;

					switch(status) {
						case 401: this.setErrorMessage('Usuário e/ou senha incorreto(s).'); break;
						case 422: this.setErrorMessage('Preencha os campos corretamente.'); break;
						case 429: this.redirectToBlocked(); break;
						default: this.setErrorMessage('Houve um erro, tente novamente!'); break;
					}
				} finally {
					this.isLoading = false;
				}
			},

			preValidate() {
				if(! this.form.email || ! this.form.password) {
					return false;
				}

				return true;
			},

			saveToLocalStorage(data) {
				if(! 'localStorage' in window) {
					return;
				}

				window.localStorage.setItem('m2center::authenticate', JSON.stringify(data));
			},

			clearErrorMessage() {
				this.errorMessage = '';
			},

			setErrorMessage(message) {
				this.errorMessage = message;
			},

			redirectToBlocked() {
				this.$router.push({ name: 'app.blocked' });
			}
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


