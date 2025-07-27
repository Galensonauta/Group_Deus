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

export async function createAfiches(afiche, container, {
  type = "movie" || "tv",
  lazyLoad = false,
  clean = true
} = {}) {
  if (clean) {
    container.innerHTML = '';
  }
  for (const movie of afiche) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('card');
    movieContainer.addEventListener('click', async () => {
      try{   
      const  movieGd  = await getRankGd(type)
      const { data: movieDetail } = await api(`/${type}/${movie.id}`)
      const { data: creditPreview } = await api(`/${type}/${movie.id}/credits`);
      const aficheDetail={
      ...movieDetail,
      ...creditPreview,
          }     
     const detailContainer = document.createElement("div")
     detailContainer.classList.add("descriptions")
      const movieTitleText = document.createElement("h1")
      movieTitleText.classList.add("movieTitleText")
      movieTitleText.innerHTML = type === "movie" ? aficheDetail.original_title
        : aficheDetail.original_name
        const movieYearPreview = document.createElement("h2");
        // Verificar si los valores existen antes de usar `split`
       const releaseDate = aficheDetail.release_date ? aficheDetail.release_date.split("-")[0] : "N/A";
       const firstAirDate = aficheDetail.first_air_date ? aficheDetail.first_air_date.split("-")[0] : "N/A";        
        // Asignar el año dependiendo del tipo
        movieYearPreview.innerHTML = type === "movie" ? releaseDate : firstAirDate;
        if(movieGd){
          const rankIMDB = document.createElement("h2")
          const rankGD = document.createElement("h2")
           const idRank= movieGd.find(id=>id.id===movie.id)
           if(idRank){
            rankGD.innerHTML = "rank en GD: " + idRank.averagerating
            rankIMDB.innerHTML = "rank en IMDB: " + aficheDetail.vote_average
            detailContainer.appendChild(rankGD)
            detailContainer.appendChild(rankIMDB)
  
                   }else{
                    rankIMDB.innerHTML = "rank en IMDB: " + aficheDetail.vote_average
                    detailContainer.appendChild(rankIMDB)
           }
        }
        

      const movieDirectingPreview = document.createElement("h2")
      movieDirectingPreview.classList.add("movieDirectingPreview")
      const created = type === "movie" ? aficheDetail.crew.filter((casting) => casting.known_for_department === "Directing").slice(0, 1)
        : aficheDetail.created_by.slice(0, 1)
      created.forEach(dire => {
        movieDirectingPreview.innerHTML = dire.name
        movieDirectingPreview.addEventListener("click", () => {
          location.hash = "#categoryByAct=" + dire.id + "-" + dire.name
        })
      })
      const movieOrigenPreview = document.createElement("h2")
      movieOrigenPreview.classList.add("movieOrigenPreview")
      const origenCountry = aficheDetail.production_countries.slice(0, 3)
      origenCountry.forEach(origen => {
        movieOrigenPreview.innerHTML = origen.name
        movieOrigenPreview.addEventListener("click", () => {
          location.hash = "#category=" + origen.iso_3166_1
        })
      })
      const btnMovieById = document.createElement("img")
      btnMovieById.src = base64LupaBtn
      btnMovieById.id = "btnMovie-id"
      if (type === "movie") {
        btnMovieById.addEventListener("click", () => {
          location.hash = "#media-movie=" + movie.id;
        })
      } else {
        btnMovieById.addEventListener("click", () => {
          location.hash = "#media-tv=" + movie.id;
        })
      }
      const btnMovieLiked = document.createElement("img")
      btnMovieLiked.id = "btnMovie-liked-preview"
      if(type==="movie"){
      addMovieList(movie,btnMovieLiked)}else{
      addTvList(movie,btnMovieLiked)}     
      detailContainer.appendChild(movieTitleText)
      detailContainer.appendChild(movieYearPreview)
      detailContainer.appendChild(movieDirectingPreview)
      detailContainer.appendChild(movieOrigenPreview)
      detailContainer.appendChild(btnMovieById)
      detailContainer.appendChild(btnMovieLiked)
      movieContainer.appendChild(detailContainer)
      movieContainer.classList.toggle("clicked")
    }catch (error) {
      console.error('Error al obtener los detalles de la película:', error);
    }
  });    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      lazyLoad ? 'data-img' : "src",
      'https://image.tmdb.org/t/p/w500' + movie.poster_path,
    );
    if (lazyLoad) {
      observador.observe(movieImg)
    }
    movieImg.dataset.triedLocal = "false";
    movieImg.addEventListener("error", () => {
      if (movieImg.dataset.triedLocal === "false") {
        movieImg.setAttribute(
          "src", base64)
        movieImg.dataset.triedLocal = "true";
      }
    })
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  }
}
