
import axios from 'axios';
// const apiTMDB  = process.env.API_KEY

//  export const api = axios.create({
//   baseURL: 'https://api.themoviedb.org/3/',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//     "Authorization": apiTMDB,
//   }
// });
export const api =
(async () => {
  try {
    const api = await import('../services/movieService'); // CommonJS
    console.log(api.default.loadApi()); // Acceso a través de `.default`
  } catch (error) {
    console.error('Error al cargar el módulo:', error);
  }
})();
export const axiosInstance = axios.create({
   baseURL: 'https://group-deus-backend-express.onrender.com/api',  // Opcionalmente, establece una URL base para tus solicitudes
   withCredentials: true,
});
