// import { API_KEY } from "./apiKey.mjs";

// import 'dotenv/config'
import axios from 'axios';
const apiTMDB  = process.env.API_KEY

 export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "Authorization": apiTMDB,
  }
});
export const axiosInstance = axios.create({
   baseURL: 'https://group-deus-backend-express.onrender.com/api',  // Opcionalmente, establece una URL base para tus solicitudes
   withCredentials: true,
});
