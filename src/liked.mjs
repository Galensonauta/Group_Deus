// liked.mjs

import { axiosInstance } from './tmdbApi.mjs';
import { isAuthenticated } from './auth.mjs'; // Si mueves isAuthenticated a un módulo separado
import { base64heartFill, base64heartEmpty } from "@imagesDefault";

export async function likeMovie(type, movie) {
  try {
    const response = await axiosInstance.post(`/listas/${type}/${movie.id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      console.log("Película agregada a la lista", response);
    } else {
      console.error("Error al agregar la película", response);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
}
export async function deleteMovieList(type, movie) {
  try {
    const response = await axiosInstance.delete(`/listas/${type}/${movie.id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      console.log("Película eliminada de la lista", response.data);
    } else {
      console.error("Error al eliminar la película", response.data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
}
function refreshHeart(isLiked, button) {
  button.src = isLiked ? base64heartFill : base64heartEmpty;
}
export async function addMovieList(movie, button) {
  isAuthenticated().then(async isAuth => {
    if (isAuth) {
      const lista = await likedMoviesList("movie");
      const listaId = lista.find(id => id.id === movie.id);
      refreshHeart(listaId, button);
      button.addEventListener("click", async () => {
        const lista = await likedMoviesList("movie");
        const listaId = lista.find(id => id.id === movie.id);
        if (listaId) {
          refreshHeart(false, button);
          await deleteMovieList("movie", movie);
        } else {
          refreshHeart(true, button);
          await likeMovie("movie", movie);
        }
        getLikedMovie();
      });
    } else {
      console.log("Usuario no autenticado. No puede agregar películas.");
    }
  });
}
export async function addTvList(tv, button) {
  isAuthenticated().then(async isAuth => {
    if (isAuth) {
      const lista = await likedMoviesList("tv");
      const listaId = lista.find(id => id.id === tv.id);
      refreshHeart(listaId, button);
      button.addEventListener("click", async () => {
        const lista = await likedMoviesList("tv");
        const listaId = lista.find(id => id.id === tv.id);
        if (!listaId) {
          refreshHeart(true, button);
          await likeMovie("tv", tv);
        } else {
          refreshHeart(false, button);
          await deleteMovieList("tv", tv);
        }
        getLikedTv();
      });
    } else {
      console.log("Usuario no autenticado. No puede agregar series.");
    }
  });
}
export async function likedMoviesList(type) {
  try {
    const response = await axiosInstance.get(`/users/my-interaction-list/${type}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al acceder a la lista del usuario:", error.message || 'Error de red');
  }
}
export async function getLikedMovie() {
  try {
    const lista = await likedMoviesList("movie");
    const container = document.getElementById("lastLiked");
    container.innerHTML = "";

    lista.forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <h2 class="movieTitleText">${movie.title}</h2>
        <p class="movieOverview">${movie.overview || "Sin descripción"}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar películas guardadas:", error);
  }
}

export async function getLikedTv() {
  try {
    const lista = await likedMoviesList("tv");
    const container = document.getElementById("lastLikedTv");
    container.innerHTML = "";

    lista.forEach(tv => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <h2 class="movieTitleText">${tv.name}</h2>
        <p class="movieOverview">${tv.overview || "Sin descripción"}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar series guardadas:", error);
  }
}

