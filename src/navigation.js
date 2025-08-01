import  "@styles/main.css";
import "@src/main.mjs";
import {
  loginUser,
  logoutUser,
  createUser,
  getTrendingPreview,
  getCategoriesPreview,
  getByCountry,
  getBySearch,
  getById,
  getInfoById,
  getSimilarById,
  getByGenres,
  getInfoByActByMovie,
  getInfoByActByTv,
  getLikedMovie,
  getProvider,
  getLikedTv,
  getRankPreview,
  getRankGdPreview,
  // getTrendingHome,
  // getRankHomeImdb,
  isAuthenticated,
  // getRankHomeGd
} from '@src/main.mjs';
import{base64GitHub}from "@imagesDefault"
if (location.hash === "" || location.hash.startsWith("#home")) {
  import("./ranking.mjs").then(({ getTrendingHome }) => {
    getTrendingHome("movie");
  });
}


let mode = false
let nroPage = 1   
const btnInicio = document.querySelector("#btnUserLog") 
    btnInicio.addEventListener("click",()=>{ 
      location.hash="#login="
    })
    const btnSalir = document.querySelector("#btnUserLogOut") 
    btnSalir.classList.add("inactive")
    btnSalir.addEventListener("click",()=>{ 
logoutUser()
    })

const btnSign = document.querySelector("#btnUserSign")
btnSign.addEventListener("click",()=>{
  location.hash="#sign="
})

const portada = document.getElementById("portada");
const btnEnter=document.querySelector("#btnEnter")
const nickInput = document.querySelector(".inputNick")
const passInput = document.querySelector(".input-pass")

btnEnter.addEventListener("click",()=>{
  loginUser(nickInput.value,passInput.value)
})

const btnCreateUser=document.querySelector("#btnCreateUser")
const inputNewNick = document.querySelector(".inputNewNick")
const inputNewPass = document.querySelector(".input-new-pass")
btnCreateUser.addEventListener("click",()=>{
  createUser(inputNewNick.value,inputNewPass.value)
})

const searchInput = document.querySelector(".search-box .input-search")
const btnSearch = document.querySelector("#btnSearch")
btnSearch.addEventListener('click', () => {
  location.hash = '#search=' + searchInput.value;
  searchInput.value=""
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    location.hash = '#search=' + searchInput.value;
    searchInput.value=""
  }
});
const btnTrends = document.querySelector("#btnTrends")
btnTrends.addEventListener("click", () => {
  location.hash = "#trend="
})
const btnRank = document.querySelector("#btnRankImdb")
btnRank.addEventListener("click", () => {
  location.hash = "#rank="
})
const btnRankGd = document.querySelector("#btnRankGd")
btnRankGd.addEventListener("click", () => {
  location.hash = "#GdRank="
})

const modeDiv = document.querySelector("#mode")
const modeH1= document.querySelector("#modeH1")
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
async function portadaBlackMirror() {  
  const titlePortada = document.querySelector(".titlePortadaSpan")
  titlePortada.innerHTML = "GrupoDeus"
  const titlePortadaData = document.querySelector(".titlePortadaH1")
  titlePortadaData.setAttribute("data-text", "Grupo Deus")
  const titlePortadaDiv = document.querySelector(".titlePortada--header")
  
  isAuthenticated().then(isAuth => {
    if (isAuth) {      
      console.log("el usuario esta autenticado")   
      btnSign.classList.add("inactive")
      btnInicio.classList.add("inactive")
      btnSalir.classList.remove("inactive")
        }else{
      btnSign.classList.remove("inactive")
      btnInicio.classList.remove("inactive")
      btnSalir.classList.add("inactive")
      console.log('Usuario no autenticado. No se cargarán las listas de favoritos.');
    } 
  })
  titlePortadaDiv.addEventListener("click", () => {
    location.hash= mode ?"#Series":"#Cine"
  })
}

const imgGitHub=document.createElement("img")
  imgGitHub.classList.add("imgGitHub")
  const footer=document.querySelector("footer")
  imgGitHub.src=base64GitHub
  footer.appendChild(imgGitHub)
  imgGitHub.addEventListener("click",()=>{
    window.open("https://github.com/Galensonauta/Group_Deus","_blank")
  })
 
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  if (location.hash.startsWith('#login=')) {
    loginPage();
  }
  else if (location.hash.startsWith('#sign=')) {
    signPage();
  }
  else if (location.hash.startsWith('#search=')) {
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
  else if(location.hash.startsWith('#GdRank=')){
    rankPageGd()
   }
  else if (location.hash.startsWith("#category")) {
    if (location.hash.startsWith("#categoryByAct=")) {
      categoryPageAct()
    } else {
      categoryPage()
    }
  }
  else if(!location.hash||location.hash==="#"){
    location.hash= mode ?"#Series":"#Cine"
  }
  else{
    homePage();

  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){      
      if(location.hash.startsWith('#search=')){
        console.log("llego al final")
      nroPage++      
      console.log("la pagina nro:",nroPage)
        const [_, query] = location.hash.split('=');
if(mode){
  getBySearch({query:query,media:"tv",nroPage});
}else{
  getBySearch({query:query,media:"movie",nroPage});
}
   }
      else if(location.hash.startsWith('#rank=')){
        console.log("llego al final")
      nroPage++      
      console.log("la pagina nro:",nroPage)
        if(mode){
          getRankPreview({media:"tv",nroPage})
        }else{
        getRankPreview({media:"movie",nroPage})}
       }       
       else if (location.hash.startsWith("#category")) {
        console.log("llego al final",categoryName)
      nroPage++      
      console.log("la pagina nro:",nroPage)
        const [_, categoryData] = location.hash.split('=');
        const [categoryId, categoryName] = categoryData.split('-');
         if (location.hash.startsWith("#categoryByAct=")) {
          if(mode){
            getInfoByActByTv({id:categoryId,nroPage})
          }else{
            getInfoByActByMovie({id:categoryId,nroPage})
          }
         } else {
  if (mode) {
    if (!isNaN(categoryId)) {
      getByGenres({id:categoryId,media:"tv",nroPage})
    } else {
      getByCountry({id:categoryId,media:"tv",nroPage})
    }   
  } else {
    if (!isNaN(categoryId)) {
      getByGenres({id:categoryId,media:"movie",nroPage})
    } else {
      getByCountry({id:categoryId,media:"movie",nroPage})
    }   
  }
         }
       }
    }
    })
  }) 

function homePage() {
  console.log("home con callback") 
  nroPage=1
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive") 
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.remove("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.remove("inactive")
  const containerLast = document.getElementById("containerLast")
    containerLast.classList.add("inactive")
    const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")  
      const lastLiked = document.getElementById("lastLiked");
      lastLiked.innerHTML=""
      const lastLikedTv = document.getElementById("lastLikedTv");
      lastLikedTv.innerHTML=""
  portadaBlackMirror()
  if (location.hash === "#Series") {
  getCategoriesPreview("tv");
  requestIdleCallback(async () => {
    const { getTrendingHome, getRankHomeGd, getRankHomeImdb } = await import("./ranking.mjs");
    getTrendingHome("tv");
    getRankHomeImdb({ media: "tv", nroPage });
    getRankHomeGd("tv");
  });
if (location.hash === "#Cine") {
  getCategoriesPreview("movie");
  requestIdleCallback(async () => {
    const { getTrendingHome, getRankHomeGd, getRankHomeImdb } = await import("./ranking.mjs");
    getTrendingHome("movie");
    getRankHomeImdb({ media: "movie", nroPage });
    getRankHomeGd("movie");
  });
}
  }  
  isAuthenticated().then(isAuth => {
    if (isAuth) {
      getLikedTv()
      getLikedMovie()
    } 
  });
    getProvider()
}

function signPage(){
  console.log("sign")
    const portada = document.getElementById("portada");
    portada.classList.remove("inactive")
    const sign =document.getElementById("sign")
    sign.classList.remove("inactive")
    const login =document.getElementById("login")
    login.classList.add("inactive")
    const trendRank=document.getElementById("trendRank")
    trendRank.classList.add("inactive")
    const containerLiked = document.getElementById("containerLiked")
    containerLiked.classList.add("inactive")
    const containerLast = document.getElementById("containerLast")
      containerLast.classList.add("inactive")
      const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
    const movieDetails = document.getElementById("moviePage");
    movieDetails.classList.add("inactive")
   
    portadaBlackMirror()
  }
 function loginPage(){
console.log("login") 
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.remove("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
    containerLast.classList.add("inactive")
    const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")

  portadaBlackMirror()
}
function trendPage() {
  console.log("trend")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")    
  if (mode) {
    getTrendingPreview("tv")
    getCategoriesPreview("tv")
  } else {
    getTrendingPreview("movie")
    getCategoriesPreview("movie")
  }
  portadaBlackMirror()
  getProvider()  
}
function rankPage() {
  console.log("rank")
  nroPage=1
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")
  if (mode) {
    getRankPreview({media:"tv",nroPage})
    getCategoriesPreview("tv")
  } else {
    getRankPreview({media:"movie",nroPage})
    getCategoriesPreview("movie")
  }
  portadaBlackMirror()
  getProvider()

  const fin = document.getElementById("fin")
  observer.observe(fin)
}
function rankPageGd() {
  console.log("rankGd")
  nroPage=1
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")  
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.add("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.remove("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")

  if (mode) {
    getRankGdPreview("tv")
    getCategoriesPreview("tv")   

  } else {
    getRankGdPreview("movie")
    getCategoriesPreview("movie")
  
  }
  portadaBlackMirror()
  getProvider()
}
function searchPage() {
  console.log("busqueda")
  nroPage=1
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")  
  portadaBlackMirror()
  getProvider()

  const [_, query] = location.hash.split('=');

  if (mode) {
    getCategoriesPreview("tv")
    getBySearch({query:query,media:"tv",nroPage});
    } else {
    getBySearch({query:query,media:"movie",nroPage});
    getCategoriesPreview("movie")    
  }  
  const fin = document.getElementById("fin")  
    observer.observe(fin) 
}
function categoryPageAct() {
  console.log("categorias por actor")
  nroPage=1
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")  
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")
  portadaBlackMirror()
  getProvider()
  const [_, query] = location.hash.split('=');

  if (mode) {
    getInfoByActByTv({id:query,nroPage})
    getCategoriesPreview("tv")
  } else {
    getInfoByActByMovie({id:query,nroPage})
    getCategoriesPreview("movie")
  }
  
  const fin = document.getElementById("fin")  
    observer.observe(fin) 
}
function categoryPage() {
  nroPage=1
  console.log("categorias")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.remove("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.add("inactive")
  portadaBlackMirror()
  getProvider()

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
   
  if (mode) {
    if (!isNaN(categoryId)) {
      getByGenres({id:categoryId,media:"tv",nroPage})
    } else {
      getByCountry({id:categoryId,media:"tv",nroPage})
    }
    getCategoriesPreview("tv")
  } else {
    if (!isNaN(categoryId)) {
      getByGenres({id:categoryId,media:"movie",nroPage})
    } else {
      getByCountry({id:categoryId,media:"movie",nroPage})
    }
    getCategoriesPreview("movie")
  }

  const fin = document.getElementById("fin")  
    observer.observe(fin)  
}
async function movieDetailsPage() {
  console.log("detalles peli")
  const portada = document.getElementById("portada");
  portada.classList.remove("inactive")  
  const login =document.getElementById("login")
  login.classList.add("inactive")
  const sign =document.getElementById("sign")
    sign.classList.add("inactive")
  const trendRank=document.getElementById("trendRank")
  trendRank.classList.add("inactive")
  const containerLiked = document.getElementById("containerLiked")
  containerLiked.classList.add("inactive")
  const containerLast = document.getElementById("containerLast")
  containerLast.classList.add("inactive")
  const containerLastRankGd= document.getElementById("containerLastRankGd")
  containerLastRankGd.classList.add("inactive")
  const movieDetails = document.getElementById("moviePage");
  movieDetails.classList.remove("inactive")


  portadaBlackMirror()
  getProvider()


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
}