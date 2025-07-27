
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://group-deus.vercel.app/api/tmdb', // <-- ajustar si cambia
  withCredentials: true
});

export const axiosInstance = axios.create({
  baseURL: 'https://group-deus.vercel.app/api',
  withCredentials: true,
});

