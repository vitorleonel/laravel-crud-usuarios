import axios from 'axios';

const instance = new axios.create({
	baseURL: 'http://m2center.test/api'
});

instance.interceptors.request.use(config => {
	const authenticate = JSON.parse(window.localStorage.getItem('m2center::authenticate'));

	if(authenticate !== null) {
		config.headers['Authorization'] = `Bearer ${authenticate.access_token}`;
	}

	return config;
});

export default instance;
