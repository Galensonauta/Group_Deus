// src/ranking.mjs
import { api } from "./tmdbApi.mjs";
import { createAfiches } from "./afiches.mjs";

// Usa `sessionStorage` para cachear llamadas de trending
export async function getTrendingHome(media) {
  const cacheKey = `trending_${media}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    const movie = JSON.parse(cachedData);
    const movies = movie.results.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average);
    createAfiches(movies, lastTrend, { type: media, lazyLoad: true, clean: true });
    return;
  }

  try {
    const { data: movie } = await api(`/trending/${media}/day`);
    sessionStorage.setItem(cacheKey, JSON.stringify(movie));
    const movies = movie.results.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average);
    createAfiches(movies, lastTrend, { type: media, lazyLoad: true, clean: true });
  } catch (error) {
    console.error('Error al obtener datos de trending:', error);
  }
}
export async function getRankHomeGd(media) {
  const { getRankGd } = await import("./main.mjs"); // O se moverá a ranking.mjs más adelante
  const data = await getRankGd(media);
  const movies = data.slice(0, 4);
  createAfiches(movies, lastRankGd, { type: media, lazyLoad: true, clean: true });
}
export async function getRankHomeImdb({ media, nroPage }) {
  const { data: movie } = await api(`/${media}/top_rated/${nroPage}`);
  const movies = movie.results.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average);
  createAfiches(movies, lastRankImdb, { type: media, lazyLoad: true, clean: nroPage === 1 });
}
