// src/ranking.mjs

import { api, axiosInstance } from "./tmdbApi.mjs";
import { createAfiches } from "./afiches.mjs";

// 🏆 Ranking del backend Group Deus
export async function getRankHomeGd(media) {
  const data = await getRankGd(media);
  const movies = data.slice(0, 4);
  createAfiches(movies, lastRankGd, { type: media, lazyLoad: true, clean: true });
}

// 🏆 Ranking IMDB
export async function getRankHomeImdb({ media, nroPage }) {
  const { data: movie } = await api(`/${media}/top_rated/${nroPage}`);
  const movies = movie.results.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average);
  createAfiches(movies, lastRankImdb, { type: media, lazyLoad: true, clean: nroPage === 1 });
}

// 🧠 Función auxiliar usada por Group Deus
export async function getRankGd(type) {
  try {
    const response = await axiosInstance.get(`/users/rank/${type}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err.response?.data || err);
    console.error('Error al acceder al ranking de usuarios:', err.message || 'Error de red');
    return [];
  }
}

// Vista previa completa (usado en categoría)
export async function getRankPreview({ media, nroPage }) {
  const { data } = await api(`/${media}/top_rated/${nroPage}`);
  if (!data || !data.results) {
    console.error("No se encontraron datos:", data);
    return;
  }
  const movie = data.results.sort((a, b) => b.vote_average - a.vote_average);
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: nroPage === 1 });
}

export async function getRankGdPreview(media) {
  const data = await getRankGd(media);
  createAfiches(data, lastGd, { type: media, lazyLoad: true, clean: true });
}

