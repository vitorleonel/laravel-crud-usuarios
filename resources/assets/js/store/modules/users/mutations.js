export default {

	getUsers: (state, payload) => {
		state.items = payload;
	},

	addUser: (state, payload) => {
		state.items = [ ...state.items, payload ];
	}

}
