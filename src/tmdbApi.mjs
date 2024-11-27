// import { API_KEY } from "@src/apiKey.js";
const { config } = require('../config/config');

import axios from 'axios';

 export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "Authorization": config.apiKey,
  }
});
export const axiosInstance = axios.create({
   baseURL: 'https://group-deus.vercel.app/',  // Opcionalmente, establece una URL base para tus solicitudes
  // Permite que todas las solicitudes de esta instancia usen cookies
  withCredentials: true,
});
