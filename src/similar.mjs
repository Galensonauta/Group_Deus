// src/similar.mjs
import { api } from "./tmdbApi.mjs";
import { createAfiches } from "./afiches.mjs";

export async function getSimilarById({ id, media }) {
  try {
    const { data } = await api(`/${media}/${id}/similar`);
    if (!data?.results?.length) {
      console.warn("No hay resultados similares para este ID");
      return;
    }

    createAfiches(data.results, lastSimilar, {
      type: media,
      lazyLoad: true,
      clean: true
    });

  } catch (error) {
    console.error("Error al obtener similares:", error);
  }
}
