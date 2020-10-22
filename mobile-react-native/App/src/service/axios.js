import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://api.github.com',
});

export default axiosInstance;