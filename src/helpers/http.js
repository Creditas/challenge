import axios from 'axios';

export const baseSetupAxios = () => {
  axios.defaults.baseURL = 'https://api.github.com';
  axios.defaults.auth = undefined;
};
