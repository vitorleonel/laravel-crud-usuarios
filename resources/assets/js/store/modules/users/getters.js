export default {
	getUsers: state => state.items,

	getUsersTotal: state => state.items.length,

	getUserSelected: state => state.selected,
}
