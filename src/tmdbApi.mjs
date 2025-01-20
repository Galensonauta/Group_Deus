
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://group-deus-backend-express.onrender.com/api/tmdb',  // Opcionalmente, establece una URL base para tus solicitudes
});
  
export const axiosInstance = axios.create({
   baseURL: 'https://group-deus-backend-express.onrender.com/api',  // Opcionalmente, establece una URL base para tus solicitudes
   withCredentials: true,
});
