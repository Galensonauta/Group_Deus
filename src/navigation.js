import {
  getTrendingPreview,
  getCategoriesPreview,
  getByCountry,
  getBySearch,
  getById,
  getInfoById,
  getSimilarById,
  getByGenres,
  getInfoByAct,
  getScrollInfinite,
  getLikedMovie,
  getProvider,
  getLikedTv,
  getRankPreview,
  getTrendingHome,
  getRankHome
} from './main.js';
import { base64IconCine, base64IconTv } from './imagesDefault.js';
let mode = false

function portadaBlackMirror() {
  const titlePortada = document.querySelector(".titlePortadaSpan")
  titlePortada.innerHTML = "GrupoDeus"
  const titlePortadaData = document.querySelector(".titlePortadaH1")
  titlePortadaData.setAttribute("data-text", "Grupo Deus")
  const titlePortadaDiv = document.querySelector(".titlePortada--header")
  titlePortadaDiv.addEventListener("click", () => {
  // location.hash="#Cine"
  location.hash= mode ?"#Series":"#Cine"

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
const modeDiv = document.querySelector("#mode")
const modeH1= document.querySelector("#modeH1")
const portada = document.getElementById("portada");
portada.classList.add("cine")
modeH1.innerHTML= "Cine"
modeDiv.appendChild(modeH1)
modeH1.addEventListener("click", () => {
  mode = !mode;
  portada.classList.toggle("cine", !mode);  
  portada.classList.toggle("series", mode);
  modeH1.innerHTML = "";
  modeH1.innerHTML = mode ? "Series" : "Cine";
  modeDiv.appendChild(modeH1);
  location.hash= mode ?"#Series":"#Cine"
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
  }else if(!location.hash||location.hash==="#"){
    // location.hash="#Cine"
    location.hash= mode ?"#Series":"#Cine"
  }
  else{
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
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.remove("inactive")
  const containerLast = document.getElementById("containerLast")
    containerLast.classList.add("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.add("inactive")
  portadaBlackMirror()
  if (location.hash==="#Series") {   
    getCategoriesPreview("tv")
    getTrendingPreview("tv")
    getRankPreview("tv")
    getTrendingHome("tv")
    getRankHome("tv")
  }else  if(location.hash==="#Cine") {
    getCategoriesPreview("movie")
    getTrendingPreview("movie")
     getRankPreview("movie")
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
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.remove("inactive")

  if (mode) {
    getTrendingPreview("tv")
    getCategoriesPreview("TV")
    titlePageSpan.innerHTML = "Estrenos Series"
    setscrollInfinitParam({ url: "trending/tv/day", query: null, searchBy: "#trend=", type: "tv" })
  } else {
    getTrendingPreview("movie")
    getCategoriesPreview("movie")
    titlePageSpan.innerHTML = "Estrenos Cine"
    setscrollInfinitParam({ url: "trending/movie/day", query: null, searchBy: "#trend=", type: "movie" })
  }
  portadaBlackMirror()
  getProvider()

  const fin = document.getElementById("fin")
  observer.observe(fin)
}
function rankPage() {
  console.log("rank")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")

  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.remove("inactive")

  if (mode) {
    getRankPreview("tv")
    getCategoriesPreview("tv")
    titlePageSpan.innerHTML = "Mejores Series "
    setscrollInfinitParam({ url: "tv/top_rated", query: null, searchBy: "#rank=", type: "tv" })
  } else {
    getRankPreview("movie")
    getCategoriesPreview("movie")
    titlePageSpan.innerHTML = "Mejores Peliculas"
    setscrollInfinitParam({ url: "movie/top_rated", query: null, searchBy: "#rank=", type: "movie" })
  }
  portadaBlackMirror()
  getProvider()

  const fin = document.getElementById("fin")
  observer.observe(fin)
}
function searchPage() {
  console.log("busqueda")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")

  // ['#search', 'platzi']
  portadaBlackMirror()
  getProvider()

  const [_, query] = location.hash.split('=');
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.remove("inactive")
  titlePageSpan.innerHTML = query
  if (mode) {
    getCategoriesPreview("tv")
    getBySearch({query:query,media:"tv"});
    setscrollInfinitParam({ url: "search/tv", query: query, searchBy: "search", type: "tv" })
  } else {
    getBySearch({query:query,media:"movie"});
    getCategoriesPreview("movie")
    setscrollInfinitParam({ url: "search/movie", query: query, searchBy: "search", type: "movie" })
  }
  observer.observe(document.getElementById("fin"))
}
function categoryPageAct() {
  console.log("categorias por actor")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  //     // ['#category', 'id-name']
  portadaBlackMirror()
  getProvider()

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.innerHTML = categoryName.replace("%20", " ")
  if (mode) {
    getInfoByAct({id:categoryId,media:"tv"})
    getCategoriesPreview("tv")
    setscrollInfinitParam({ url: "person/" + categoryId + "/tv_credits", query: categoryId, searchBy: "#categoryByAct=", type: "tv" })
  } else {
    getInfoByAct({id:categoryId,media:"movie"})
    getCategoriesPreview("movie")
    setscrollInfinitParam({ url: "'discover/movie'", query: categoryId, searchBy: "#categoryByAct=", type: "movie" })
  }
  observer.observe(document.getElementById("fin"))
}
function categoryPage() {
  console.log("categorias")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const movieDetails = document.querySelector(".moviePage");
  movieDetails.classList.add("inactive")
  //     // ['#category', 'id-name']

  portadaBlackMirror()
  getProvider()

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  const titlePageSpan = document.querySelector(".titlePageSpan")
  titlePageSpan.classList.add("inactive")
  titlePageSpan.innerHTML = categoryName
  
  if (mode) {
    if (!isNaN(categoryId)) {
      getByGenres({id:categoryId,media:"tv"})
      setscrollInfinitParam({ url: "discover/tv", query: categoryId, searchBy: "#categoryByGenre=", type: "tv" })
    } else {
      getByCountry({id:categoryId,media:"tv"})
      setscrollInfinitParam({ url: "discover/tv", query: categoryId, searchBy: "#categoryByCountry=", type: "tv" })
    }
    getCategoriesPreview("tv")
  } else {
    if (!isNaN(categoryId)) {
      getByGenres({id:categoryId,media:"movie"})
      setscrollInfinitParam({ url: "discover/movie", query: categoryId, searchBy: "#categoryByGenre=", type: "movie" })
    } else {
      getByCountry({id:categoryId,media:"movie"})
      setscrollInfinitParam({ url: "discover/movie", query: categoryId, searchBy: "#categoryByCountry=", type: "movie" })
    }
    getCategoriesPreview("movie")
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
  
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
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
    getById({id:movieId,media:"tv"})
    getInfoById({id:movieId,media:"tv"})
    getSimilarById({id:movieId,media:"tv"})
    getCategoriesPreview("tv")
  } else {
    getById({id:movieId,media:"movie"})
    getInfoById({id:movieId,media:"movie"})
    getSimilarById({id:movieId,media:"movie"})
    getCategoriesPreview("movie")
  }
  portadaBlackMirror()
  getProvider()

}