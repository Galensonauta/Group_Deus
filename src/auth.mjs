import { axiosInstance } from './tmdbApi.mjs';

export async function loginUser(nick, password) {
  try {
    const response = await axiosInstance.post('/auth/login', { nick, password });
    console.log('Usuario autenticado con éxito:', response);
    window.location.href = 'https://group-deus.vercel.app';
    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data?.message || error.message);
    alert('Error al iniciar sesión. Verifica tus credenciales.');
  }
}
export async function logoutUser() {
  try {
    const response = await axiosInstance.post('/auth/logout');
    console.log('Cierre de sesión exitoso', response);
    window.location.href = 'https://group-deus.vercel.app';
  } catch (error) {
    console.error('Error de red:', error);
  }
}
export async function createUser(nick, password) {
  try {
    const response = await axiosInstance.post('/users', { nick, password });
    console.log('Usuario creado con éxito:', response.data);
    await loginUser(nick, password); // Autologin
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error.response || error.message);
    alert('Error al crear usuario. Verifica tus credenciales.');
  }
}
export async function isAuthenticated() {
  try {
    const response = await axiosInstance.get('/auth/validate-token');
    const portada = document.getElementById("portada");
    const titleNick = document.createElement("h1");
    titleNick.classList.add("titleNick");
    titleNick.textContent = response.data.loginUser;
    portada.appendChild(titleNick);
    return true;
  } catch (error) {
    console.error('Token inválido o expirado:', error.message || 'Error de red');
    return false;
  }
}
