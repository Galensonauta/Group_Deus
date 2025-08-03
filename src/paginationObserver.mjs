// paginationObserver.mjs
import { getBySearch } from './search.mjs';
import { getByGenres, getByCountry } from './categoryBy.mjs';
import { getRankPreview } from './ranking.mjs';
import { getInfoByActByMovie, getInfoByActByTv } from './categoryBy.mjs';

let nroPage = 1;
let mode = false; // modo "false" = movie, "true" = tv

export function setPaginationMode(isTV) {
  mode = isTV;
}

export function resetPagination() {
  nroPage = 1;
}

export const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const hash = location.hash;
    nroPage++;
    console.log("Paginar", hash, "→ Página:", nroPage);

    if (hash.startsWith("#search=")) {
      const [_, query] = hash.split("=");
      getBySearch({ query, media: mode ? "tv" : "movie", nroPage });

    } else if (hash.startsWith("#rank=")) {
      getRankPreview({ media: mode ? "tv" : "movie", nroPage });

    } else if (hash.startsWith("#categoryByAct=")) {
      const [_, raw] = hash.split("=");
      const [id] = raw.split("-");
      const fn = mode ? getInfoByActByTv : getInfoByActByMovie;
      fn({ id, nroPage });

    } else if (hash.startsWith("#category=")) {
      const [_, raw] = hash.split("=");
      const [id] = raw.split("-");

      const isGenre = !isNaN(id);
      const fn = isGenre ? getByGenres : getByCountry;
      fn({ id, media: mode ? "tv" : "movie", nroPage });
    }
  });
});
