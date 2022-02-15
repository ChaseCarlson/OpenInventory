import axios from 'axios';

const baseUrl = '/api/v1/';
const port = 8080;

const instance = axios.create({
	
});

instance.defaults.baseURL =  window.location.protocol + "//" + window.location.hostname + ":" + port + baseUrl;

export default instance;