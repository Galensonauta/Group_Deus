// import { API_KEY } from "@src/apiKey.js";
import axios from 'axios';
const { API_KEY } = process.env

// const {pass}  = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjM3MjI4MjAyMDc4NTVlYTUxM2I3YjMyYjc5NmVhZiIsIm5iZiI6MTcyNDI3NzA0MC45MzAwMDIsInN1YiI6IjY0Mzk3OTNhZWVjNWI1MDEwMzYwY2ViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2QWh6M-QrZ4OBMjm-t6EYoxf40WTe9ziqxLgEmKazic"
 export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "Authorization": API_KEY,
  }
});
export const axiosInstance = axios.create({
   baseURL: 'https://group-deus.vercel.app/',  // Opcionalmente, establece una URL base para tus solicitudes
  // Permite que todas las solicitudes de esta instancia usen cookies
  withCredentials: true,
});
