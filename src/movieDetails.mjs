import { api } from './tmdbApi.mjs';
import { base64, base64Gr, base64NextBtn, base64PrevBtn } from '@imagesDefault';
import { idCountry } from './provider.mjs';
import { base64Cast } from '@imagesDefault';

/** Muestra un afiche responsivo basado en tamaño de pantalla y media type */
function renderResponsivePoster(movie, media) {
  const poster = document.querySelector(".poster");
  poster.innerHTML = "";

  const img = document.createElement("img");
  img.classList.add("imgPoster");
  img.dataset.triedLocal = "false";

  const width = window.innerWidth;

  let src = "";
  if (width <= 500) {
    src = 'https://image.tmdb.org/t/p/w342' + movie.poster_path;
    img.style.width = "342px";
    img.style.height = "520px";
  } else if (width <= 1199) {
    src = 'https://image.tmdb.org/t/p/w500' + (movie.backdrop_path || movie.poster_path);
    img.style.width = "100vw";
    img.style.height = "75vh";
  } else {
    src = 'https://image.tmdb.org/t/p/w1280' + (movie.backdrop_path || movie.poster_path);
    img.style.width = "1280px";
    img.style.height = "725px";
  }

  img.src = src;
  img.onerror = () => {
    if (img.dataset.triedLocal === "false") {
      img.src = movie.backdrop_path ? base64Gr : base64;
      img.dataset.triedLocal = "true";
      img.style.objectFit = "contain";
    }
  };
  const hasValidImage = movie.poster_path || movie.backdrop_path;
img.src = hasValidImage ? src : base64;


  poster.appendChild(img);
}

/** Crea un carrusel de videos embebidos de YouTube */
function setupVideoCarousel(videos) {
  const carrousel = [];
  const container = document.querySelector(".carousel__slide");
  const header = document.querySelector(".afiche");

  if (!Array.isArray(videos) || videos.length === 0) {
    header.style.display = "none";
    return;
  }

  videos.forEach((vid) => {
    const iframe = document.createElement("iframe");
    iframe.classList.add("video");
    iframe.setAttribute("src", `https://www.youtube.com/embed/${vid.key}`);
    iframe.style.width = "90vw";
    iframe.style.height = "45vw";
    iframe.setAttribute("loading", "lazy"); // Lazy load iframe
    carrousel.push(iframe);
  });

  let index = 0;

  const showSlide = (i) => {
    container.innerHTML = "";
    container.appendChild(carrousel[i]);
  };

  const next = () => {
    index = (index + 1) % carrousel.length;
    showSlide(index);
  };

  const prev = () => {
    index = (index - 1 + carrousel.length) % carrousel.length;
    showSlide(index);
  };

  // Controles
  const nextBtn = document.createElement("img");
  nextBtn.src = base64NextBtn;
  nextBtn.classList.add("nextBtn");
  nextBtn.addEventListener("click", next);

  const prevBtn = document.createElement("img");
  prevBtn.src = base64PrevBtn;
  prevBtn.classList.add("prevBtn");
  prevBtn.addEventListener("click", prev);

  showSlide(index);

  header.innerHTML = "";
  header.style.display = "flex";
  header.append(prevBtn, container, nextBtn);
}

/** Función principal: carga la información del ID y renderiza poster y carrusel */
export async function getById({ id, media }) {
  try {
    const { data: movie } = await api(`/${media}/${id}/video`);

    renderResponsivePoster(movie, media);

    // Espera ociosa para mejorar rendimiento (no bloquea el thread principal)
    requestIdleCallback(() => {
      setupVideoCarousel(movie.videos?.results || []);
    });

  } catch (err) {
    console.error("Error cargando información de la película:", err);
  }
}

// 🎯 Renderiza títulos según tipo de medio
function renderTitles(movie, media) {
  const titles = document.querySelector(".titles");
  const title1 = document.querySelector(".title1");
  const title2 = document.querySelector(".title2");

  title1.textContent = media === "movie" ? movie.original_title : movie.original_name;
  title2.textContent = "";

  if ((media === "movie" && movie.title !== movie.original_title) ||
      (media === "tv" && movie.name !== movie.original_name)) {
    title2.textContent = media === "movie" ? movie.title : movie.name;
  }

  titles.append(title1, title2);
}

// 🎯 Renderiza logos de proveedores de streaming
function renderProviders(providerData) {
  const logos = document.querySelector(".logos");
  logos.innerHTML = "";
  const iso = idCountry()?.iso_3166_1 || "AR";

  const providers = providerData.results?.[iso];
  if (!providers || (!providers.flatrate && !providers.free)) {
    logos.classList.add("logosMensaje");
    logos.textContent = "No disponible en: " + iso;
    return logos;
  }

  const source = providers.flatrate || providers.free || [];
  source.forEach((p) => {
    const img = document.createElement("img");
    img.classList.add("logoProvider");
    img.src = `https://image.tmdb.org/t/p/w300${p.logo_path}`;
    logos.appendChild(img);
  });

  return logos;
}

// 🎯 Renderiza metadatos básicos: año, score, origen, géneros, sinopsis
function renderMetadata(movie, media) {
  const infoExtra = document.querySelector(".infoExtra");
  infoExtra.innerHTML = "";

  const year = document.createElement("span");
  year.classList.add("year");
  year.textContent = `Estrenada: ${media === "movie" ? movie.release_date.split("-")[0] : movie.first_air_date.split("-")[0]}`;

  const score = document.createElement("span");
  score.classList.add("rating");
  score.textContent = `Calificación en IMDB: ${movie.vote_average} / 10`;

  const countries = document.createElement("div");
  countries.classList.add("origenCountry");
  movie.production_countries.forEach(c => {
    const span = document.createElement("span");
    span.classList.add("origen");
    span.textContent = `${c.name} / `;
    span.onclick = () => location.hash = `#category=${c.iso_3166_1}`;
    countries.appendChild(span);
  });

  const genres = document.createElement("div");
  genres.classList.add("genresContainer");
  movie.genres.forEach(g => {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = `${g.name} / `;
    tag.onclick = () => location.hash = `#category=${g.id}`;
    genres.appendChild(tag);
  });

  const overview = document.createElement("p");
  overview.classList.add("overview");
  overview.textContent = movie.overview || "Sin descripción";

  infoExtra.append(year, score, countries, genres, overview);
}

// 🎯 Renderiza reparto + dirección / creadores
function renderCast(credit, media, movie) {
  const castContainer = document.querySelector(".castMovie");
  castContainer.innerHTML = "";

  const actors = credit.cast
    .filter(c => c.known_for_department === "Acting")
    .sort((a, b) => a.order - b.order)
    .slice(0, 10);

  const directors = media === "movie"
    ? credit.crew.filter(c => c.known_for_department === "Directing" && c.job === "Director")
    : movie.created_by?.slice(0, 2) || [];

  const people = [...actors, ...directors];

  people.forEach(person => {
    if (!person.profile_path) return;
    const name = document.createElement("h1");
    name.classList.add("castName");
    name.textContent = person.name;
    if (person.known_for_department === "Directing" || person.job === "Director") {
      name.style.color = "red";
      name.style.fontSize = "21px";
    }

    const img = document.createElement("img");
    img.classList.add("movieImg");
    img.src = `https://image.tmdb.org/t/p/w200${person.profile_path}`;
    img.onerror = () => { img.src = base64Cast; };

    name.onclick = () => {
      location.hash = `#categoryByAct=${person.id}-${person.name}`;
    };

    castContainer.append(name, img);
  });
}

// 🎯 Función principal (públicamente exportada)
export async function getInfoById({ id, media }) {
  try {
    const [{ data: movie }, { data: credit }, { data: provider }] = await Promise.all([
      api(`/${media}/${id}`),
      api(`/${media}/${id}/credits`),
      api(`/${media}/${id}/watch/providers`)
    ]);

    renderTitles(movie, media);
    const logos = renderProviders(provider);
    const movieInfo = document.querySelector(".movieInfo");
    movieInfo.appendChild(logos);

    renderMetadata(movie, media);
    renderCast(credit, media, movie);
    movieInfo.appendChild(document.querySelector(".infoExtra"));

  } catch (error) {
    console.error("Error cargando detalles del contenido:", error);
  }
}




// Separación de UI helpers (portadaBlackMirror, etc.)
// Repaso integral (como mencionaste)
// Deploy