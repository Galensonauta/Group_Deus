// src/categoryBy.mjs
import { api } from "./tmdbApi.mjs";
import { createAfiches } from "./afiches.mjs";

// Utilidad para crear dropdowns de categoría y país
export function createCategories(categories, container, id, name) {
  container.innerHTML = "";

  const isGenre = container.id === "apiDropdown";
  const defaultOption = document.createElement("option");
  defaultOption.innerHTML = isGenre ? "Géneros" : "Origen";
  container.appendChild(defaultOption);

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category[id];
    option.textContent = category[name];
    container.appendChild(option);
  });

  container.addEventListener("change", (e) => {
    const selected = e.target.value;

    if (!selected) return;
    if (!isNaN(selected)) {
      location.hash = `#categoryByGenre=${selected}`;
    } else {
      location.hash = `#categoryByCountry=${selected}`;
    }
  });
}

// Carga las categorías de géneros y países
export async function getCategoriesPreview(media) {
  const apiDropDown = document.getElementById("apiDropdown");
  const apiDropDownPais = document.getElementById("apiDropdownPais");

  const [{ data: genreData }, { data: countryData }] = await Promise.all([
    api(`/genre/${media}/list`),
    api('/configuration/countries')
  ]);

  createCategories(genreData.genres, apiDropDown, "id", "name");
  createCategories(countryData, apiDropDownPais, "iso_3166_1", "native_name");
}
export async function getTrendingPreview(media) {
  const { data } = await api(`/trending/${media}/day`)
  if (!data || !data.results) {
    console.error("No se encontraron datos:", data);
    return;
  }
  const movies = data.results
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type: media, lazyLoad: true, clean: true })
}

// Filtros

export async function getByCountry({ id, media, nroPage }) {
  const { data } = await api(`/discoverCountry/${media}/${id}/${nroPage}`);
  if (!data?.results) return console.error("No se encontraron datos por país");
  createAfiches(data.results.sort(orderByRating), last, { type: media, lazyLoad: true, clean: nroPage === 1 });
}

export async function getByGenres({ id, media, nroPage }) {
  const { data } = await api(`/discoverGenre/${media}/${id}/${nroPage}`);
  if (!data?.results) return console.error("No se encontraron datos por género");
  createAfiches(data.results.sort(orderByRating), last, { type: media, lazyLoad: true, clean: nroPage === 1 });
}

export async function getBySearch({ query, media, nroPage }) {
  const { data } = await api(`/search/${media}/${query}/${nroPage}`);
  if (!data?.results) return console.error("No se encontraron datos en la búsqueda");
  createAfiches(data.results, last, { type: media, lazyLoad: true, clean: nroPage === 1 });
}

export async function getInfoByActByMovie({ id, nroPage }) {
  const { data } = await api(`/discoverAct/movie/${id}/${nroPage}`);
  if (!data?.results) return console.error("No se encontraron datos por actor/director (movie)");
  createAfiches(data.results.sort(orderByRating), last, { type: "movie", lazyLoad: true, clean: nroPage === 1 });
}

export async function getInfoByActByTv({ id, nroPage }) {
  const { data } = await api(`/person/${id}/tv_credits/${nroPage}`);
  if (!data?.cast) return console.error("No se encontraron datos por actor/director (tv)");
  createAfiches(data.cast.sort(orderByRating), last, { type: "tv", lazyLoad: true, clean: nroPage === 1 });
}

// Utilidad para ordenar por score
function orderByRating(a, b) {
  return b.vote_average - a.vote_average;
}
