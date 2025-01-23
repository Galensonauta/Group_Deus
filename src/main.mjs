import {api,axiosInstance} from "./tmdbApi.mjs"


import { base64, 
  base64Gr, 
  base64Cast, 
  base64NextBtn, 
  base64PrevBtn, 
  base64LupaBtn, 
  base64heartEmpty, 
  base64heartFill } 
from "@imagesDefault"

function idCountry() {
  const item = JSON.parse(localStorage.getItem("id_country"))
  let idCountry
  if (item && item !== undefined) {
    idCountry = item
  }
  else {
    idCountry = null
  }
  return idCountry
}
function idCountrySelect(idC) {
  const addIdC = {}
  if (idC && idC.iso_3166_1) {
    addIdC[idC.iso_3166_1] = idC
  } else {
    console.error("paso")
    addIdC[idC.iso_3166_1] = undefined
  }
  localStorage.setItem("id_country", JSON.stringify(addIdC))
}
export async function getProvider() {
  const apiDropDownPaisProvider = document.getElementById("apiDropDownPaisProvider");
  const { data: provider } = await api(`/providers`)
  const forCountry = provider.results
  createCategoriesProvider(forCountry, apiDropDownPaisProvider, "iso_3166_1", "native_name")
}
function createCategoriesProvider(categories, container, id, name) {
  container.innerHTML = ""
  const apiDropDownPaisProvider = document.getElementById("apiDropDownPaisProvider");
  const countryList = document.createElement("option")
  const isoCou = Object.values(idCountry() || { iso_3166_1: 'AR', native_name: "Argentina" })
  const nativeName = isoCou[0].native_name || "Argentina"
  countryList.textContent = nativeName
  apiDropDownPaisProvider.appendChild(countryList)
  categories.forEach((value) => {
    const countryList = document.createElement("option")
    countryList.classList.add("slide")
    countryList.value = value[id]
    countryList.textContent = value[name]
    container.appendChild(countryList)
  })
  container.addEventListener("change", (event) => {
    const selectedOptions = event.target.value
    let idCountry = categories.find(country => country[id] === selectedOptions);
    if (idCountry && idCountry[id]) {
      idCountrySelect(idCountry);

    } else {
      console.error("idCountry o idCountry[id] es undefined");
    }
  })

}
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
}
const observador = new IntersectionObserver((imgs) => {
  imgs.forEach((img) => {
    if (img.isIntersecting) {
      const url = img.target.getAttribute("data-img")
      img.target.setAttribute("src", url)
      observador.unobserve(img.target)
    }
  })
}, options)

//llamados a API del Grupo Deus
export async function loginUser(nick, password) {
  try {
    const response = await axiosInstance.post('/auth/login', {
      nick,
      password,
    });
    console.log('Usuario autenticado con éxito:', response);
    

    window.location.href = 'https://group-deus.vercel.app';   
    return response;    
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response ? error.response.data.message : error.message);
    alert('Error al iniciar sesión. Verifica tus credenciales.');
  }
}
export async function logoutUser() {
  try {
    const response = await axiosInstance.post('/auth/logout')    
      console.log('Cierre de sesión exitoso',response); 
      window.location.href = 'https://group-deus.vercel.app';   
    } catch (error) {
    console.error('Error de red:', error);
  }
}
export async function createUser(nick, password) {
  try {
    const response = await axiosInstance.post('/users', {
      nick,
      password,
    });
    console.log('Usuario creado con éxito:', response.data);
   loginUser(nick,password)
    return response.data;    
  } catch (error) {
    console.error('Error al crear usuario:', error.response || error.message);
        alert('Error al crear usuario. Verifica tus credenciales.');
  }
}
async function getRankGd(type){
  try{
    const response =await axiosInstance.get(`/users/rank/${type}`);
    if(response.status===200){
      return response.data
    }
  }catch(err){
    console.log(err.response.data)
    console.error('Error al acceder al ranking de usuarios:', err.message || 'Error de red');   
  }
}
async function likedMoviesList(type) {
  try {
    const response = await axiosInstance.get(`/users/my-interaction-list/${type}`);    
    if (response.status === 200) {
      return response.data;  // Devuelve los datos para su uso posterior  
    }
  } catch (error) {
    console.log(error.response.data)
    console.error('Error al acceder a la lista del usuario:', error.message || 'Error de red');   
  }
}
export async function getInteractionMovie(type,movie){
  try{
    const response = await axiosInstance(`/users/interactions-movies/${type}/${movie}`)  

if (response.status === 200) {   
  const interactionData =  response.data
  console.log("todos los comment",interactionData)
  return interactionData
  }}
  catch(error){
    console.error("Error al hacer la solicitud al servidor:", error);
  }
}
 async function addInteraction(type, movie, interactionData) {
  try {
    const response = await axiosInstance.patch(
      `/movies/my-interaction-new/${type}/${movie}`,
      interactionData,  // Pasar los datos directamente, no es necesario hacer JSON.stringify
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = response.data;
    if (response.status === 200) {  // Verificamos que la solicitud sea exitosa
      console.log("Interacción agregada", data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
}
async function likeMovie(type,movie) {  
  try {
  const response = await axiosInstance.post(`/listas/${type}/${movie.id}`, {
    headers: {
      'Content-Type': 'application/json',
    }});
  if (response.status === 201) {
    console.log("Película agregada a la lista", response);
  } else {
    console.error("Error al agregar la película", response);
  }
} catch (error) {
  console.error("Error al hacer la solicitud al servidor:", error);
}
}
 async function deleteMovieList(type,movie){
  try {
    const response = await axiosInstance.delete(`/listas/${type}/${movie.id}`, {
      headers: {
        'Content-Type': 'application/json',
      }});
    const data = response.data
    if (response.status === 201) {
      console.log("Película eliminada de la lista", data);
    } else {
      console.error("Error al eliminar la película", data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
  }
  export async function isAuthenticated() {
    try {
      const response = await axiosInstance.get('/auth/validate-token');
      const portada = document.getElementById("portada");
    const titleNick= document.createElement("h1")
titleNick.classList.add("titleNick")
const nickName=response.data.loginUser
titleNick.textContent=nickName
portada.appendChild(titleNick)
      return response.status === 200; // Si el servidor responde con un 200, el token es válido
    } catch (error) {
      console.error('Token inválido o expirado:', error.message || 'Error de red');
      return false; // Si ocurre un error, asumimos que el token no es válido
    }
  }
async function addMovieList(movie,button){
  isAuthenticated().then(async isAuth => {
    if (isAuth) {
      const lista= await likedMoviesList("movie")
          const listaId= lista.find(id=>id.id===movie.id)
          refreshHeart(listaId,button)    
        button.addEventListener("click", async() => {       
          const lista= await likedMoviesList("movie")
          const listaId= lista.find(id=>id.id===movie.id)
  if(listaId) {    
    refreshHeart(false, button);
    await deleteMovieList("movie",movie)  
  } else{
    refreshHeart(true, button);
    await likeMovie("movie",movie);
    // Agregar la película a la lista   
      } 
   getLikedMovie()
}); 
    } else {
      console.log('Usuario no autenticado. Nopuede agregar peliculas.');
    }
  });        
         }
async function addTvList(tv,button){
  isAuthenticated().then(async isAuth => {
    if (isAuth) {
  const lista= await likedMoviesList("tv")
  const listaId= lista.find(id=>id.id===tv.id)
  refreshHeart(listaId,button)
  button.addEventListener("click", async() => {
    const lista= await likedMoviesList("tv")
    const listaId= lista.find(id=>id.id===tv.id)
if(!listaId) { 
refreshHeart(true, button);
await likeMovie("tv",tv);
// Agregar la película a la lista  
} else{
refreshHeart(false, button);
await  deleteMovieList("tv",tv)   
} 
getLikedTv()
})
} else {
  console.log('Usuario no autenticado. Nopuede agregar peliculas.');
}
}); 
}
function refreshHeart(isLiked, button){
  if(isLiked){    
    button.src=base64heartFill
  }else{
    button.src=base64heartEmpty
  }
}


// llamados a API de The Movie DB
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
export async function getLikedMovie() {
   
      const movies = await likedMoviesList("movie")

      createAfiches(movies, lastLiked, { type: "movie", lazyLoad: true, clean: true })
   
}
export async function getLikedTv() {
 
      const tvs = await likedMoviesList("tv")     
    createAfiches(tvs, lastLikedTv, { type: "tv", lazyLoad: true, clean: true })
     
}
export function createCategories(categories, container, id, nombre) {
  container.innerHTML = ""
  const apiDropDown = document.getElementById("apiDropdown");
  const apiDropDownPais = document.getElementById("apiDropdownPais");
  const categoryOptions1 = document.createElement("option")
  const categoryOptions2 = document.createElement("option")
  categoryOptions1.innerHTML = "Generos"
  categoryOptions2.innerHTML = "Origen"
  apiDropDown.appendChild(categoryOptions1)
  apiDropDownPais.appendChild(categoryOptions2)

  categories.forEach(category => {
    const categoryOptions = document.createElement("option")
    categoryOptions.value = category[id]
    categoryOptions.textContent = category[nombre]
    container.appendChild(categoryOptions)
  })
  container.addEventListener("change", (event) => {
    const catId = event.target.value
    //  let catNameCountry = categories.find(country => country[id] === catId);   
    if (catId === "") {
      container.value = "";
    } else if (!isNaN(catId)) {
      location.hash = `#categoryByGenre=${catId}`
    }
    else {
      location.hash = `#categoryByCountry=${catId}`
    }
  })

}
export async function getCategoriesPreview(media) {
  const apiDropDown = document.getElementById("apiDropdown");
  const apiDropDownPais = document.getElementById("apiDropdownPais");
  const { data: genero } = await api(`/genre/${media}/list`);  
  const { data: country } = await api('/configuration/countries');
  const countrys = country
  const generos = genero.genres;
  createCategories(generos, apiDropDown, "id", "name");
  createCategories(countrys, apiDropDownPais, "iso_3166_1", "native_name");
}
export function getScrollInfinite({ url, query = undefined, type = "movie" }) {
  return async function () {   
    const {data}  = await api(`/${url}/${query}`
    //   , {
    //   params: { query },
    // }
  );
    if (!data || !data.results) {
      console.error('Los datos no son la postxxx:', data);
      return;
    }
    console.log("la paginacion dasterlocura:",data)
        const movies = data.results
    createAfiches(movies, last, { type, lazyLoad: true, clean: false })
  }
}
export async function getTrendingHome(media) {
  const { data: movie } = await api(`/trending/${media}/day`)
  const movies = movie.results.slice(0, 4)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, lastTrend, { type: media, lazyLoad: true, clean: true })
}
export async function getRankHomeGd(media) {
  const data  = await getRankGd(media) 
  const movies= data.slice(0,4) 
  createAfiches(movies, lastRankGd, { type: media, lazyLoad: true, clean: true })
}
export async function getRankHomeImdb(media) {
  const  { data: movie } = await api(media + "/top_rated")
  const movies = movie.results.slice(0, 4)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, lastRankImdb, { type: media, lazyLoad: true, clean: true })
}
export async function getTrendingPreview(media) {
  const { data } = await api(`/trending/${media}/day`)
  const movies = data.results
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type: media, lazyLoad: true, clean: true })
}
export async function getRankGdPreview(media) {
  const data  = await getRankGd(media)
  // const movies= data.slice(0,2) 
  createAfiches(data, lastGd, { type: media, lazyLoad: true, clean: true  })
}
export async function getRankPreview(media) {
  const { data } = await api(media + "/top_rated")
  const movie = data.results
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: true })
}
export async function getInfoByActByMovie(id) {  
    const { data } = await api(`discoverAct/movie/${id}`);
    const movies = data.results;
    movies.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movies, last, { type: "movie", lazyLoad: true, clean: true })
  }
  export async function getInfoByActByTv (id){
  const { data } = await api(`/person/${id}/tv_credits`);
  const credits = data.cast;
  credits.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(credits, last, { type: "tv", lazyLoad: true, clean: true })
}
export async function getByCountry({ id, media }) {
  const { data } = await api(`/discoverCountry/${media}/${id}`)
  const movie = data.results;
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: true })
}
export async function getByGenres({ id, media }) {
  const { data } = await api(`/discoverGenre/${media}`,{
    params: {id}
  });
  const movies = data.results;
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type: media, lazyLoad: true, clean: true })
}
export async function getBySearch({ query, media }) {
  const { data } = await api(`/search/${media}`,{
    params: {query}
  });
  const movie = data.results;
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: true })
}
export async function getById({ id, media }) {
  const { data: movie } = await api(`/${media}/${id}/video`);
  const poster = document.querySelector(".poster")
  poster.innerHTML = ""
  const imgPoster = document.createElement('img');
  imgPoster.classList.add("imgPoster")
  const refeMobile = window.innerWidth;
  imgPoster.dataset.triedLocal = "false";
  if (refeMobile <= 500) {
    imgPoster.setAttribute("src", 'https://image.tmdb.org/t/p/w342' + movie.poster_path)
    imgPoster.addEventListener("error", () => {
      if (imgPoster.dataset.triedLocal === "false") {
        imgPoster.setAttribute(
          "src", base64)
        imgPoster.dataset.triedLocal = "true";
        imgPoster.style.width = "342px"; // Establecer el ancho deseado
        imgPoster.style.height = "520px"; // Establecer la altura deseada
      }
    })
  }
  if (refeMobile <= 1199 && refeMobile >= 499) {
    imgPoster.setAttribute("src", 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path)
    imgPoster.style.width = "100vw";
    imgPoster.style.height = "75vh";
    if (!movie.backdrop_path) {
      imgPoster.setAttribute("src", 'https://image.tmdb.org/t/p/w500' + movie.poster_path)
    } if (!movie.backdrop_path && !movie.poster_path) {
      imgPoster.addEventListener("error", () => {
        imgPoster.setAttribute(
          "src", base64Gr)
        imgPoster.style.objectFit = "contain";
      })
    }
  }
  if (refeMobile >= 1200) {
    imgPoster.setAttribute("src", 'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path)
    if (!movie.backdrop_path) {
      imgPoster.setAttribute("src", 'https://image.tmdb.org/t/p/w1280' + movie.poster_path)
      imgPoster.style.width = "1280px"; // Establecer el ancho deseado
      imgPoster.style.height = "725px"; // Establecer la altura deseada  
    } if (!movie.backdrop_path && !movie.poster_path) {
      imgPoster.addEventListener("error", () => {
        imgPoster.setAttribute(
          "src", base64Gr)
        imgPoster.style.width = "1280px"; // Establecer el ancho deseado
        imgPoster.style.height = "725px"; // Establecer la altura deseada
        imgPoster.style.objectFit = "contain";
      })
    }
  }
  poster.appendChild(imgPoster)
  const carrousel = []
  const headerSection = document.querySelector(".afiche")
  const containerVid = document.querySelector(".carousel__slide")
  const movieVideo = movie.videos.results
  console.log(movieVideo)
  movieVideo.forEach(vid => {
    const video = document.createElement("iframe")
    video.classList.add("video")
    video.setAttribute("src", `https://www.youtube.com/embed/${vid.key}`)
    video.style.width= "90vw";
    video.style.height= "45vw";
    carrousel.push(video)
  })
  let contIndex = 0
  function showCarrousel(index) {
    containerVid.innerHTML = ""
    containerVid.appendChild(carrousel[index])
  }
  function next() {
    contIndex = (contIndex + 1) % carrousel.length;
    showCarrousel(contIndex)
  }
  function prev() {
    contIndex = (contIndex - 1 + carrousel.length) % carrousel.length;
    showCarrousel(contIndex)
  }
  function carrouselVideos() {
    if (carrousel.length === 0) {
      console.log("sin videos")
      headerSection.style.display = "none"
      headerSection.appendChild(containerVid)
    } else {
      headerSection.style.display = "flex"
      const imgNext = document.createElement("img")
      imgNext.src = base64NextBtn
      imgNext.classList.add("nextBtn")
      const imgPrev = document.createElement("img")
      imgPrev.src = base64PrevBtn
      imgPrev.classList.add("prevBtn")
      imgNext.addEventListener("click", next)
      imgPrev.addEventListener("click", prev)

      showCarrousel(contIndex);

      headerSection.appendChild(imgNext)
      headerSection.appendChild(imgPrev)
      headerSection.appendChild(containerVid)
    }
  }
  carrouselVideos()
}
export async function getSimilarById({ id, media }) {
  const { data } = await api(`/${media}/${id}/similar`)
  const similares = data.results
  createAfiches(similares, lastSimilar, { type: media, lazyLoad: true, clean: true })
}
export async function getInfoById({ id, media}) 
  {   
  const { data: movie } = await api(`/${media}/${id}`)
  const { data: credit } = await api(`/${media}/${id}/credits`)
  const { data: provider } = await api(`/${media}/${id}/watch/providers`)

  const movieInfo = document.querySelector(".movieInfo")
  const titles= document.querySelector(".titles")
  const infoExtra = document.querySelector(".infoExtra")
 
  //titulo original y en español
  const movieTitleOriginal = document.querySelector(".title1")
  const movieTitleEs = document.querySelector(".title2")
  movieTitleEs.innerHTML = ""
  if (media === "movie") {
    if (movie.title === movie.original_title) {
      movieTitleOriginal.textContent = movie.original_title
    } else {
      movieTitleEs.textContent = movie.title
      movieTitleOriginal.textContent = movie.original_title
    }
  } else if (media === "tv") {
    if (movie.title === movie.original_name) {
      movieTitleOriginal.textContent = movie.original_name
    } else {
      movie.original_name
      movieTitleOriginal.textContent = movie.original_name
    }
  }
  titles.appendChild(movieTitleOriginal)
  titles.appendChild(movieTitleEs)

  // createLogoProviderByid
  const logos = document.querySelector(".logos")
  logos.innerHTML = ""
  const isoCou = Object.values(idCountry() || { iso_3166_1: "AR" })
  const iso_3166_1 = isoCou[0].iso_3166_1 || Object.values({ iso_3166_1: "AR" })
  console.log(iso_3166_1)
  if (!provider.results[iso_3166_1] || !provider.results[iso_3166_1].flatrate && !provider.results[iso_3166_1].free) {
    console.log("No esta")
    logos.classList.add("logosMensaje")
    logos.innerHTML="No disponible en: "+iso_3166_1
    movieInfo.appendChild(logos)
  } else {
    const providerByCountry = provider.results[iso_3166_1].flatrate || provider.results[iso_3166_1].free || []    
    logos.classList.add("logos")
    movieInfo.appendChild(logos)
    providerByCountry.forEach(id => {
      const providerImg = document.createElement("img")
      providerImg.classList.add("logoProvider")
      providerImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + id.logo_path)
      logos.appendChild(providerImg)
      movieInfo.appendChild(logos)
    })
  }
  //manejo de info(año)
  const yearMovie = document.querySelector(".year")
  if (media === "movie") {
    yearMovie.innerHTML = "Estrenada: " + movie.release_date.split("-")[0]
  } else {
    yearMovie.innerHTML = "Estrenada: " + movie.first_air_date.split("-")[0]
  }
  infoExtra.appendChild(yearMovie)
  //manejo de score(IMDB)
  const movieScore = document.querySelector(".rating")
  movieScore.innerHTML = "Calificación en IMDB: " + movie.vote_average + " / 10"
  infoExtra.appendChild(movieScore)

  //manejo de info(origen)
  const origenMovie = movie.production_countries
  const containerOrigen = document.querySelector(".origenCountry")
  containerOrigen.innerHTML = ""
  origenMovie.forEach(o => {
    const origen = document.createElement("span")
    origen.classList.add("origen")
    origen.innerHTML = o.name + " /"
    containerOrigen.appendChild(origen)
    origen.addEventListener("click", () => {
      location.hash = "#category=" + o.iso_3166_1
    })
  })  
  infoExtra.appendChild(containerOrigen)

  //manejo de info(generos)
  const genresContainer = document.querySelector(".genresContainer")
  genresContainer.innerHTML = ""
  const tags = movie.genres
  tags.forEach(t => {
    const generos = document.createElement("span")
    generos.classList.add("tag")
    generos.textContent = t.name + " / "
    genresContainer.appendChild(generos)
    generos.addEventListener("click", () => {
      location.hash = "#category=" + t.id
    })
  })
  infoExtra.appendChild(genresContainer)

  //manejo de info(overview)
  const overview = document.querySelector(".overview")
  if (!movie.overview) {
    overview.innerHTML = "Sin descripción"
  } else {
    overview.innerHTML = movie.overview
  }
  infoExtra.appendChild(overview)

 
  
  //manejo interacciones
  const interaction =document.querySelector(".interaction")

  const commentContainer= document.querySelector(".commentContainer")
  
  async function showComment(){
    commentContainer.innerHTML=""
 const interData= await getInteractionMovie(media,movie.id)
 if(interData !==undefined){
 interData.forEach(comment=>{
 const comentario = document.createElement("p")
  comentario.classList.add("comentario")
  const rankeo = document.createElement("p")
  rankeo.classList.add("rankeo")
  if(media==="movie"){
    if (comment.userMovie && comment.userMovie[0] && comment.userMovie[0].UserMovie) {    
      comentario.textContent = comment.nick+": "+comment.userMovie[0].UserMovie.comment;
      rankeo.textContent = comment.userMovie[0].UserMovie.rank + "/10" + " puntos según: "+comment.nick;
    }
 }else{
  if (comment.userTv && comment.userTv[0] && comment.userTv[0].UserTv) {   
    comentario.textContent=comment.nick+": "+comment.userTv[0].UserTv.comment;
    rankeo.textContent=comment.userTv[0].UserTv.rank +  "/10" + " puntos según: "+ comment.nick;
  }  
  }  
  commentContainer.appendChild(comentario)
  commentContainer.appendChild(rankeo)
})
}}
const commentContainerUser = document.querySelector(".commentContainerUser");

//funcion que recarga boton e inputs
function setupButton() {
  const commentInput = document.querySelector(".inputComment");
  const rankInput = document.querySelector(".inputRank");
  const btnComment = document.getElementById("btnComment");
  const btnRankMovie = document.getElementById("btnRankMovie");
 
  const btnMovieLiked = document.createElement("img");
  btnMovieLiked.id = "btnMovie-liked";
  if (media === "movie") {
    addMovieList(movie, btnMovieLiked);
  } else {
    addTvList(movie, btnMovieLiked);
  }
  const heartContainer = document.querySelector(".heartContainer");
  if (heartContainer) {
    heartContainer.innerHTML = "";
    heartContainer.appendChild(btnMovieLiked);
  }
  // Manejo del botón de comentarios

  const newBtnComment = btnComment.cloneNode(true);  // Clona el botón para eliminar eventos previos
btnComment.replaceWith(newBtnComment);
newBtnComment.addEventListener("click", async () => {
      const commentValue = commentInput.value;
      const interactionData = { comment: commentValue }; 
      await addInteraction(media, movie.id, interactionData);
            showComment()
            commentInput.innerHTML="Escribe tu comentario aquí..."
          });   
  // Manejo del botón de ranking

  const newBtnRankMovie = btnRankMovie.cloneNode(true);  // Clona el botón para eliminar eventos previos
  btnRankMovie.replaceWith(newBtnRankMovie);

  newBtnRankMovie.addEventListener("click", async () => {
      const rankValue = rankInput.value; // Obtener el valor del input
      const interactionData = { rank: rankValue }; // Crear un nuevo objeto para cada interacción
      await addInteraction(media, movie.id, interactionData);
      console.log("Puntuación agregada", rankValue);
      showComment()
      rankInput.innerHTML="del 0 1 al 10"
    });

    commentContainerUser.appendChild(commentInput);
    commentContainerUser.appendChild(newBtnComment);

    commentContainerUser.appendChild(rankInput);
    commentContainerUser.appendChild(newBtnRankMovie);

    commentContainerUser.appendChild(heartContainer);


  interaction.appendChild(commentContainerUser);
}
isAuthenticated().then( (isAuth) => {
  if (isAuth) {
    console.log("Usuario autenticado y puede interactuar");
    commentContainerUser.classList.remove("inactive");
    setupButton();  
  } else {
    commentContainerUser.classList.add("inactive");
    const comentario = document.createElement("p")
    comentario.classList.add("comentario")
    comentario.textContent="Para comentar o rankear debes estar autenticado"
    commentContainer.appendChild(comentario)
    interaction.appendChild(commentContainer)
    console.log("Usuario no autenticado, no puede interactuar");
  }
});
showComment()
interaction.appendChild(commentContainer)
infoExtra.appendChild(interaction);


 //manejo de info(cast)
  const acting = credit.cast.filter((casting) => casting.known_for_department === "Acting").slice(0, 10)
  acting.sort((a, b) => a.order - b.order)
  const directing = media === "movie" ? credit.crew.filter((casting) => casting.known_for_department === "Directing").filter((cast) => cast.job === "Director")
    : movie.created_by.slice(0, 2)
  const castTotal = [...acting, ...directing]
  const containerCast = document.querySelector(".castMovie")
  containerCast.innerHTML = ""
  castTotal.forEach(act => {
    const castName = document.createElement("h1")
    castName.classList.add("castName")
    if (act.known_for_department === "Directing") {
      castName.innerHTML = `<h1 style="color: red; font-size: 21px;">${act.name}</h1>`
    } else {
      castName.innerHTML = act.name
    }
    const castId = act.id
    const castImg = document.createElement("img")
    castImg.classList.add("movieImg")
    castImg.setAttribute("src", "https://image.tmdb.org/t/p/w200" + act.profile_path)
    castImg.addEventListener("error", () => {
      castImg.setAttribute("src", base64Cast)
    })
    castName.addEventListener("click", () => {
      location.hash = "#categoryByAct=" + castId + "-" + act.name
    })
    containerCast.appendChild(castName)
    containerCast.appendChild(castImg)
  })

  infoExtra.appendChild(containerCast)

movieInfo.appendChild(infoExtra)


  const footerMovie = document.querySelector(".footerMovie")
  movieInfo.appendChild(footerMovie)
} 
