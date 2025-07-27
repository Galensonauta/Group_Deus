
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://group-deus-backend-express.onrender.com/api/tmdb', // ✅ URL completa a Render
  withCredentials: true
});


export const axiosInstance = axios.create({
  baseURL: 'https://group-deus-backend-express.onrender.com/api',
  withCredentials: true,
});
