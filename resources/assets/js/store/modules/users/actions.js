import api from '../../../services/api';

export default {

	getUsers: (context) => {
		api.get('/users')
			.then(response => {
				context.commit('getUsers', response.data.data);
			})
			.catch(error => console.log(error.response));
	},

	addUser: (context, payload) => {
		return new Promise((resolve, reject) => {
			api.post('/users', payload)
				.then(response => {
					context.commit('addUser', response.data.data);
					resolve(response);
				})
				.catch(error => reject(error));
		});
	},

	editUser: (context, payload) => {
		if(payload.data.password === '') {
			delete payload.data.password;
		}

		return new Promise((resolve, reject) => {
			api.put(`/users/${payload.id}`, payload.data)
				.then(response => {
					context.commit('editUser', payload);
					resolve(response);
				})
				.catch(error => reject(error));
		});
	},

	selectUser: (context, payload) => {
		context.commit('selectUser', payload);
	}

}
