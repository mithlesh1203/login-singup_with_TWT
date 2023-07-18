import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000';

const api = axios.create({
  baseURL: apiBaseUrl,
});

export { api };
