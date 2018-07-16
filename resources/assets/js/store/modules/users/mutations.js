export default {

	getUsers: (state, payload) => {
		state.items = payload;
	},

	addUser: (state, payload) => {
		state.items = [ ...state.items, payload ];
	},

	editUser: (state, payload) => {
		state.items = state.items.map(item => {
			if(item.id === payload.id) {
				item.name = payload.data.name;
				item.email = payload.data.email;
			}

			return item;
		})
	},

	removeUser: (state, id) => {
		state.items = state.items.filter(item => item.id != id);
	},

	selectUser: (state, payload) => {
		state.selected = payload;
	}

}
