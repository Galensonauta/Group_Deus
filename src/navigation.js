import {
  getTrendingTvPreview,
  getCategoriesTvPreview,
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCountry,
  getTvByCountry,
  getMoviesBySearch,
  getTvBySearch,
  getMovieById,
  getTvById,
  getInfoMovieById,
  getInfoTvById,
  getSimilarMovieById,
  getSimilarTvById,
  getMoviesByGenres,
  getTvByGenres,
  getInfoMovieByAct,
  getInfoTvByAct,
  getScrollInfinite,
  getLikedMovie,
  getProvider,
  getLikedTv,
  getRankMoviePreview,
  getRankTvPreview,
  getTrendingHome,
  getRankHome
} from './main.js';
import { base64IconCine, base64IconTv } from './imagesDefault.js';
function portadaBlackMirror() {
  const titlePortada = document.querySelector(".titlePortadaSpan")
  titlePortada.innerHTML = "GrupoDeus"
  const titlePortadaData = document.querySelector(".titlePortadaH1")
  titlePortadaData.setAttribute("data-text", "Grupo Deus")
  const titlePortadaDiv = document.querySelector(".titlePortada--header")
  titlePortadaDiv.addEventListener("click", () => {
    location.hash = "#"
  })
}
const searchInput = document.querySelector(".search-box input")
const btnSearch = document.querySelector("#btnSearch")
btnSearch.addEventListener('click', () => {
  location.hash = '#search=' + searchInput.value;
});
const btnTrends = document.querySelector("#btnTrends")
btnTrends.addEventListener("click", () => {
  location.hash = "#trend="
})
const btnRank = document.querySelector("#btnRank")
btnRank.addEventListener("click", () => {
  location.hash = "#rank="
})
let mode = false
const btnMode = document.querySelector("#btnMode")
const modeDiv = document.querySelector("#mode")
const modeH1= document.querySelector("#modeH1")

const portada = document.getElementById("portada");
portada.classList.add("cine")
modeH1.innerHTML= "Cine"    

const iconTv = document.createElement("img")
iconTv.setAttribute("src", base64IconTv)
const iconCine = document.createElement("img")
iconCine.setAttribute("src", base64IconCine)
btnMode.appendChild(iconCine)
modeDiv.appendChild(btnMode)

btnMode.addEventListener("click", () => {
  mode = !mode;

  portada.classList.toggle("cine", !mode);
  portada.classList.toggle("series", mode);
  btnMode.innerHTML = "";
  modeH1.innerHTML = mode ? "Series" : "Cine";
  btnMode.appendChild(mode ? iconTv : iconCine);
  
  modeDiv.appendChild(modeH1);
  modeDiv.appendChild(btnMode);

  location.hash = "#";
})


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  if (location.hash.startsWith('#search=')) {
    searchPage();
  }
  else if (location.hash.startsWith('#media-')) {
    movieDetailsPage();
  }

  else if (location.hash.startsWith('#trend=')) {
    trendPage()
  }
  else if(location.hash.startsWith('#rank=')){
   rankPage()
  }
  else if (location.hash.startsWith("#category")) {
    if (location.hash.startsWith("#categoryByAct")) {
      categoryPageAct()
    } else {
      categoryPage()
    }
  }
  else {
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
let scrollInfinitParam = {
  url: "",
  query: null,
  searchBy: ""
}
function setscrollInfinitParam(params) {
  scrollInfinitParam = { ...scrollInfinitParam, ...params }
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      getScrollInfinite(scrollInfinitParam)()
    }
  })
})
function homePage() {
  console.log("home")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.remove("inactive")
  const containerLast = document.getElementById("containerLast")
    containerLast.classList.add("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.add("inactive")
  portadaBlackMirror()
  if (mode) {
    getCategoriesTvPreview()
    getTrendingTvPreview()
    getRankTvPreview()
    getTrendingHome("tv")
    getRankHome("tv")
  } else {
    getCategoriesPreview()
    getTrendingMoviesPreview()
    getRankMoviePreview()
    getTrendingHome("movie")
    getRankHome("movie")
  }
  getLikedTv()
  getLikedMovie()
  getProvider()
}
function trendPage() {
  console.log("trend")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.remove("inactive")

  if (mode) {
    getTrendingTvPreview()
    getCategoriesTvPreview()
    titlePageSpan.innerHTML = "Estrenos Series"
    setscrollInfinitParam({ url: "trending/tv/day", query: null, searchBy: "#trend=", type: "tv" })
  } else {
    getTrendingMoviesPreview()
    getCategoriesPreview()
    titlePageSpan.innerHTML = "Estrenos Cine"
    setscrollInfinitParam({ url: "trending/movie/day", query: null, searchBy: "#trend=", type: "movie" })
  }
  portadaBlackMirror()
  const fin = document.getElementById("fin")
  observer.observe(fin)
}
function rankPage() {
  console.log("rank")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")

  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.remove("inactive")

  if (mode) {
    getRankTvPreview()
    getCategoriesTvPreview()
    titlePageSpan.innerHTML = "Mejores Series "
    setscrollInfinitParam({ url: "tv/top_rated", query: null, searchBy: "#rank=", type: "tv" })
  } else {
    getRankMoviePreview()
    getCategoriesPreview()
    titlePageSpan.innerHTML = "Mejores Peliculas"
    setscrollInfinitParam({ url: "movie/top_rated", query: null, searchBy: "#rank=", type: "movie" })
  }
  portadaBlackMirror()
  const fin = document.getElementById("fin")
  observer.observe(fin)
}
function searchPage() {
  console.log("busqueda")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")

  // ['#search', 'platzi']
  portadaBlackMirror()
  const [_, query] = location.hash.split('=');
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.remove("inactive")
  titlePageSpan.innerHTML = query
  if (mode) {
    getCategoriesTvPreview()
    getTvBySearch(query);
    setscrollInfinitParam({ url: "search/tv", query: query, searchBy: "search", type: "tv" })
  } else {
    getMoviesBySearch(query);
    getCategoriesPreview()
    setscrollInfinitParam({ url: "search/movie", query: query, searchBy: "search", type: "movie" })
  }
  observer.observe(document.getElementById("fin"))
}
function categoryPageAct() {
  console.log("categorias por actor")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  //     // ['#category', 'id-name']
  portadaBlackMirror()
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.innerHTML = categoryName.replace("%20", " ")
  if (mode) {
    getInfoTvByAct(categoryId)
    getCategoriesTvPreview()
    setscrollInfinitParam({ url: "person/" + categoryId + "/tv_credits", query: query, searchBy: "#categoryByAct=", type: "tv" })
  } else {
    getInfoMovieByAct(categoryId)
    getCategoriesPreview()
    setscrollInfinitParam({ url: "'discover/movie'", query: query, searchBy: "#categoryByAct=", type: "movie" })
  }
  observer.observe(document.getElementById("fin"))
}
function categoryPage() {
  console.log("categorias")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  //     // ['#category', 'id-name']

  portadaBlackMirror()
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.add("inactive")

  titlePageSpan.innerHTML = categoryName
  if (mode) {
    if (!isNaN(categoryId)) {
      getTvByGenres(categoryId)
      setscrollInfinitParam({ url: "discover/tv", query: categoryId, searchBy: "#categoryByGenre=", type: "tv" })
    } else {
      getTvByCountry(categoryId)
      setscrollInfinitParam({ url: "discover/tv", query: categoryId, searchBy: "#categoryByCountry=", type: "tv" })
    }
    getCategoriesTvPreview()
  } else {
    if (!isNaN(categoryId)) {
      getMoviesByGenres(categoryId)
      setscrollInfinitParam({ url: "discover/movie", query: categoryId, searchBy: "#categoryByGenre=", type: "movie" })
    } else {
      getMoviesByCountry(categoryId)
      setscrollInfinitParam({ url: "discover/movie", query: categoryId, searchBy: "#categoryByCountry=", type: "movie" })
    }
    getCategoriesPreview()
  }

  const fin = document.getElementById("fin")
  if (fin) {
    observer.observe(fin)
  } else {
    console.error("fin no funca")
  }
}
function movieDetailsPage() {
  console.log("detalles peli")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.add("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.remove("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")

  titlePageSpan.classList.add("inactive")

  const [_, movieId] = location.hash.split('=');
  if (_ === "#media-tv") {
    getTvById(movieId)
    getInfoTvById(movieId)
    getSimilarTvById(movieId)
    getCategoriesTvPreview()
  } else {
    getMovieById(movieId)
    getInfoMovieById(movieId)
    getSimilarMovieById(movieId)
    getCategoriesPreview()
  }
  portadaBlackMirror()
}