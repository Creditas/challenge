import axios from './axios';

export const fetchRepositories = async (login, token) => {
	const { data } = await axios.get(`/users/${login}/repos`, {
		headers: {
			Authorization: `Basic ${token}`
		}
	});

	return data;
};

export const fetchCommits = async (user, nameRepo, token) => {
	const { data } = await axios.get(`/repos/${user}/${nameRepo}/commits`, {
		headers: {
			Authorization: `Basic ${token}`
		}
	});

	return data;
};