import axios from './axios';

export const fetchDataUser = async (token) => {
	const { data } = await axios.get('/user', {
		headers: {
			Authorization: `Basic ${token}`
		}
	});

	return data;
};