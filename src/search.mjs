// src/search.mjs
import { api } from "./tmdbApi.mjs";
import { createAfiches } from "./afiches.mjs";

export async function getBySearch({ query, media, nroPage }) {
  try {
    const { data } = await api(`/search/${media}/${query}/${nroPage}`);
    if (!data?.results?.length) {
      console.warn("No se encontraron resultados para la búsqueda");
      return;
    }

    createAfiches(data.results, last, {
      type: media,
      lazyLoad: true,
      clean: nroPage === 1
    });

  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
}
