// src/afiches.mjs
import { base64, base64heartEmpty, base64heartFill, base64LupaBtn } from "@imagesDefault";
import { getRankGd } from "./main.mjs"; // temporal
import { api } from "./tmdbApi.mjs";

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observador = new IntersectionObserver((imgs) => {
  imgs.forEach((img) => {
    if (img.isIntersecting) {
      const url = img.target.getAttribute("data-img");
      img.target.setAttribute("src", url);
      observador.unobserve(img.target);
    }
  });
}, options);

export function createAfiches(afiche, container, {
  type = "movie" || "tv",
  lazyLoad = false,
  clean = true,
} = {}) {
  if (clean) container.innerHTML = "";

  afiche.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("card");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(lazyLoad ? "data-img" : "src", 'https://image.tmdb.org/t/p/w500' + movie.poster_path);
    if (lazyLoad) observador.observe(movieImg);

    movieImg.dataset.triedLocal = "false";
    movieImg.addEventListener("error", () => {
      if (movieImg.dataset.triedLocal === "false") {
        movieImg.setAttribute("src", base64);
        movieImg.dataset.triedLocal = "true";
      }
    });

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}
