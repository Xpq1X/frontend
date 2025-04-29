// frontend/src/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // or your Laravel server IP/URL
  withCredentials: true, // if using cookies + Sanctum
});

export default api;
