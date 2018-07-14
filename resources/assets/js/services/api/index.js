import axios from 'axios';

const instance = new axios.create({
	baseURL: 'http://m2center.test/api'
});

export default instance;
