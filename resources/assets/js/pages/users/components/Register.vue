<template>
	<div>
		<div class="mb-8" v-show="usersTotal > 0">
			<Button text="Novo Usuário" shadow @click.native="toggleRegisterModal" />
		</div>

		<Modal v-show="registerModal" @closeModal="toggleRegisterModal">
				<ErrorMessage :error="errorMessage" />

				<form method="post" ref="form" @submit.prevent="submitForm">
					<label for="name">Nome completo</label>
					<input type="text" id="name" class="input" placeholder="nome completo" required v-model="form.name">

					<label for="email">E-mail</label>
					<input type="email" id="email" class="input" placeholder="e-mail" required v-model="form.email">

					<label for="password">Senha</label>
					<input type="password" id="password" class="input" placeholder="senha" required v-model="form.password">

					<Button type="submit" :text="isLoading ? 'Aguarde...' : 'Cadastrar'" />
					<Button class="float-right" text="Cancelar" outlined @click.native="toggleRegisterModal" />
				</form>
		</Modal>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import ErrorMessage from '../../../components/ErrorMessage';
	import Modal from '../../../components/Modal';
	import Button from '../../../components/Button';

	export default {
		components: {
			ErrorMessage,
			Modal,
			Button,
		},

		data() {
			return {
				isLoading: false,

				errorMessage: '',
				registerModal: false,

				form: {
					name: '',
					email: '',
					password: '',
				},
			}
		},

		computed: {
			... mapGetters({
				usersTotal: 'getUsersTotal'
			})
		},

		methods: {
			toggleRegisterModal() {
				this.resetForm();
				this.registerModal = !this.registerModal;
			},

			submitForm() {
				if(! this.preValidate()) {
					return;
				}

				this.isLoading = true;

				this.addUser(this.form)
					.then(response => {
						this.toggleRegisterModal();
						this.getUsers();
					})
					.catch(error => console.log(error))
					.finally(() => this.isLoading = false);
			},

			preValidate() {
				if(! this.form.name || ! this.form.email || ! this.form.password) {
					return false;
				}

				return true;
			},

			resetForm() {
				this.$refs.form.reset();

				this.form.name = '';
				this.form.email = '';
				this.form.password = '';
			},

			... mapActions(['getUsers', 'addUser'])
		},
	}
</script>


