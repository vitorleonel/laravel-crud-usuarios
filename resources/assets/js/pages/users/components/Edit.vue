<template>
	<Modal>
			<form method="post" ref="form" @submit.prevent="submitForm">
				<label for="name">Nome completo</label>
				<input type="text" id="name" class="input" placeholder="nome completo" required v-model="form.name">

				<label for="email">E-mail</label>
				<input type="email" id="email" class="input" placeholder="e-mail" required v-model="form.email">

				<label for="password">Senha (opcional)</label>
				<input type="password" id="password" class="input" placeholder="senha" v-model="form.password">

				<Button type="submit" :text="isLoading ? 'Aguarde...' : 'Atualizar'" />
				<Button text="Remover" danger @click.native="deleteUser" />

				<Button class="float-right" text="Cancelar" outlined @click.native="closeModal" />
			</form>
	</Modal>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import Modal from '../../../components/Modal';
	import Button from '../../../components/Button';

	export default {
		components: {
			Modal,
			Button,
		},

		data() {
			return {
				isLoading: false,
				registerModal: false,

				form: {
					name: '',
					email: '',
					password: '',
				},
			}
		},

		mounted() {
			this.form.name = this.userSelected.name;
			this.form.email = this.userSelected.email;
		},

		computed: {
			... mapGetters({
				userSelected: 'getUserSelected'
			})
		},

		methods: {
			closeModal() {
				this.resetForm();
				this.selectUser(null);
			},

			submitForm() {
				if(! this.preValidate()) {
					return;
				}

				this.isLoading = true;

				this.editUser({ id: this.userSelected.id, data: {...this.form} })
					.then(response => {
						this.closeModal();
					})
					.catch(error => {
						const message = JSON.stringify(error.response);

						alert(message);
					})
					.finally(() => this.isLoading = false);
			},

			deleteUser() {
				this.removeUser(this.userSelected.id)
					.then(response => {
						this.closeModal();
					})
					.catch(error => {
						const message = JSON.stringify(error.response);

						alert(message);
					})
					.finally(() => this.isLoading = false);
			},

			preValidate() {
				if(! this.form.name || ! this.form.email) {
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

			... mapActions(['editUser', 'removeUser', 'selectUser'])
		},
	}
</script>


