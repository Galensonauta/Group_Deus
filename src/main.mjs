

// import { API_KEY } from "@src/apiKey.js";
import axios from 'axios';
// const { API_KEY } = process.env
// const api = axios.create({
//   baseURL: 'https://api.themoviedb.org/3/',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//     "Authorization":API_KEY,
//   }
// });
import {api} from "./tmdbApi.mjs"

import { base64, base64Gr, base64Cast, base64NextBtn, base64PrevBtn, base64LupaBtn, base64heartEmpty, base64heartFill } from "@imagesDefault"

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
    addIdC[idC.iso_3166_1] = undefined
    console.error("paso")
  }
  localStorage.setItem("id_country", JSON.stringify(addIdC))
}
export async function getProvider() {
  const apiDropDownPaisProvider = document.getElementById("apiDropDownPaisProvider");
  const { data: provider } = await api(`watch/providers/regions?language=en-US`)
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
async function likedMoviesList() {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/listas/1/movie`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (response.ok) {
      return data.moviesList; // Devuelve la lista de películas desde el backend
    } else {
      console.error("Error al obtener las películas likeadas:", data);
      return {}; // Retorna un objeto vacío si hay un error
    }
  } catch (error) {
    console.error("Error al conectar con el servidor de peliculas:", error);
    return {}; // Retorna un objeto vacío si hay un error en la conexión
  }
} 
export async function getInteractionMovieId(type,movie){
    try {
      const response = await fetch(`http://localhost:3001/api/v1/users/${type}/${movie}`, {
        method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }})
        const interactionData = await response.json();
  console.log(interactionData)
      if (response.ok) {
        // Si hay un comentario guardado, reemplazar el input con el texto
        const commentInput = document.querySelector(".inputComment");
        const rankInput = document.querySelector(".inputRank")
        if (interactionData.comment||interactionData.rank) {
          const commentText = document.createElement("p");
          commentText.textContent = interactionData.comment;
          commentInput.replaceWith(commentText);
          const rankText = document.createElement("p");
          rankText.textContent = rankInput.value;      
          // Reemplazar el input por el nuevo elemento de texto
          rankInput.replaceWith(rankText);                        
        }    
      } else {
        console.error("Error al cargar la interacción", interactionData);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud al servidor:", error);
    }
  } 

export async function addInteraction(type,movie,interactionData){
  try{
    const response = await fetch(`http://localhost:3001/api/v1/movies/1/${type}/${movie.id}`,{
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interactionData),
    })
    const data= await response.json()
    if (response.ok) {
      console.log("interaccion agregada", data);
    } else {
      console.error("Error al agregar la interaccion", data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
  }

async function likeMovie(movie) {  
  try {
  const response = await fetch(`http://localhost:3001/api/v1/listas/1/movie/${movie.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId: movie.id })  // Pasar el ID de la película también en el cuerpo
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Película agregada a la lista", data);
  } else {
    console.error("Error al agregar la película", data);
  }
} catch (error) {
  console.error("Error al hacer la solicitud al servidor:", error);
}
}
 async function deleteMovieList(movie){
  try {
    const response = await fetch(`http://localhost:3001/api/v1/listas/1/movie/${movie.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Película eliminada de la lista", data);
    } else {
      console.error("Error al eliminar la película", data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
  }
async function likedTvList() {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/listas/1/tv`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (response.ok) {
      return data.tvsList; // Devuelve la lista de películas desde el backend
    } else {
      console.error("Error al obtener las películas likeadas:", data);
      return {}; // Retorna un objeto vacío si hay un error
    }
  } catch (error) {
    console.error("Error al conectar con el servidor de listas:", error);
    return {}; // Retorna un objeto vacío si hay un error en la conexión
  }
}
async function likeTvs(tv) {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/listas/1/tv/${tv.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tvId: tv.id })  // Pasar el ID de la película también en el cuerpo
    });
    const data = await response.json();
    if (response.ok) {
      console.log("serie agregada a la lista", data);
    } else {
      console.error("Error al agregar la serie", data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
}
async function deleteTvList(movie){
  try {
    const response = await fetch(`http://localhost:3001/api/v1/listas/1/tv/${movie.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Película eliminada de la lista", data);
    } else {
      console.error("Error al eliminar la película", data);
    }
  } catch (error) {
    console.error("Error al hacer la solicitud al servidor:", error);
  }
}
async function addMovieList(movie,button){    
          const lista= await likedMoviesList()
          const listaId= lista.find(id=>id.id===movie.id)
          refreshHeart(listaId,button)
    
        button.addEventListener("click", async() => {
          const lista= await likedMoviesList()
          const listaId= lista.find(id=>id.id===movie.id)
  if(!listaId) { 
    refreshHeart(true, button);
    await likeMovie(movie);
    // Agregar la película a la lista  
  } else{
    refreshHeart(false, button);
    await  deleteMovieList(movie)   
      } 
   getLikedMovie()
}); 
}
async function addTvList(tv,button){
  const lista= await likedTvList()
  const listaId= lista.find(id=>id.id===tv.id)
  refreshHeart(listaId,button)
  button.addEventListener("click", async() => {
    const lista= await likedTvList()
    const listaId= lista.find(id=>id.id===tv.id)
if(!listaId) { 
refreshHeart(true, button);
await likeTvs(tv);
// Agregar la película a la lista  
} else{
refreshHeart(false, button);
await  deleteTvList(tv)   
} 
getLikedTv()
})
}

function refreshHeart(isLiked, button){
  if(isLiked){    
    button.src=base64heartFill
  }else{
    button.src=base64heartEmpty
  }
}

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
      const { data: movieDetail } = await api(`${type}/${movie.id}?language=es-LA`)
      const { data: creditPreview } = await api(`${type}/${movie.id}/credits?language=es-LA`);
      const aficheDetail={
      ...movieDetail,
      ...creditPreview,
      // movieDetailDbArrId           
          }          
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
      const movieScorePreview = document.createElement("h2")
      movieScorePreview.innerHTML = "valoración: " + aficheDetail.vote_average + "/10"

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

      const detailContainer = document.createElement("div")
      detailContainer.classList.add("descriptions")
      detailContainer.appendChild(movieTitleText)
      detailContainer.appendChild(movieYearPreview)
      detailContainer.appendChild(movieScorePreview)
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
  const addedMovies = await likedMoviesList()
  const movies=Object.values(addedMovies)
  console.log(movies)
  createAfiches(movies, lastLiked, { type: "movie", lazyLoad: true, clean: true })
}
export async function getLikedTv() {
  const addedTvs = await likedTvList()  
  const tvs=Object.values(addedTvs)
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
  const { data: genero } = await api("genre/" + media + "/list");
  const { data: country } = await api('configuration/countries?language=es-LA');
  const countrys = country
  const generos = genero.genres;
  createCategories(generos, apiDropDown, "id", "name");
  createCategories(countrys, apiDropDownPais, "iso_3166_1", "native_name");
}
// let maxPage;
let page = 1;
export function getScrollInfinite({ url, query = undefined, searchBy = undefined, type = "movie" }) {
  return async function () {
    page++;
    const parameter = { page }
    if (searchBy === '#categoryByGenre=') { parameter.with_genres = query }
    if (searchBy === 'search') { parameter.query = query }
    if (searchBy === "#categoryByAct=") { parameter.with_cast = query }
    if (searchBy === "#categoryByAct=") { parameter.query = query }
    if (searchBy === "#categoryByCountry=") { parameter.with_origin_country = query }
    const { data } = await api(url, {
      params: parameter
    })
    const movies = data.results
    createAfiches(movies, last, { type, lazyLoad: true, clean: false })
  }
}
export async function getTrendingHome(media) {
  const { data: movie } = await api("trending/" + media + "/day")
  const movies = movie.results.slice(0, 4)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  console.log(movies)
  createAfiches(movies, lastTrend, { type: media, lazyLoad: true, clean: true })
}
export async function getRankHome(media) {
  const { data: movie } = await api(media + '/top_rated')
  const movies = movie.results.slice(0, 4)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, lastRank, { type: media, lazyLoad: true, clean: true })
}
export async function getTrendingPreview(media) {
  const { data } = await api("trending/" + media + "/day")
  const movies = data.results
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type: media, lazyLoad: true, clean: true })
}
export async function getRankPreview(media) {
  const { data } = await api(media + "/top_rated")
  const movie = data.results
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: true })
}
export async function getInfoByActByMovie(id) {  
    const { data } = await api('discover/movie', {
      params: {
        with_cast: id
      }
    });
    const movies = data.results;
    movies.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movies, last, { type: "movie", lazyLoad: true, clean: true })
  }
  export async function getInfoByActByTv (id){
  const { data } = await api('person/' + id + "/tv_credits");
  const credits = data.cast;
  credits.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(credits, last, { type: "tv", lazyLoad: true, clean: true })}
// export async function getInfoByAct({ id, media }) {
//   if (media === "movie") {
//     const { data } = await api('discover/movie', {
//       params: {
//         with_cast: id
//       }
//     });
//     const movies = data.results;
//     movies.sort((a, b) => b.vote_average - a.vote_average)
//     createAfiches(movies, last, { type: "movie", lazyLoad: true, clean: true })
//   } else {
//     const { data } = await api('person/' + id + "/tv_credits");
//     const credits = data.cast;
//     credits.sort((a, b) => b.vote_average - a.vote_average)
//     createAfiches(credits, last, { type: "tv", lazyLoad: true, clean: true })
//   }
// }
export async function getByCountry({ id, media }) {
  const { data } = await api("discover/" + media, { params: { with_origin_country: id } })
  const movie = data.results;
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: true })
}
export async function getByGenres({ id, media }) {
  const { data } = await api('discover/' + media, {
    params: {
      with_genres: id,
      page
    }
  });
  // maxPage = data.total_pages
  const movies = data.results;
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type: media, lazyLoad: true, clean: true })
}
export async function getBySearch({ query, media }) {
  const { data } = await api("search/" + media, {
    params: {
      query,
    },
  });
  const movie = data.results;
  createAfiches(movie, last, { type: media, lazyLoad: true, clean: true })
}
export async function getById({ id, media }) {
  const { data: movie } = await api(`${media}/${id}?append_to_response=videos,images`);
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
  const { data } = await api(`${media}/${id}/similar?language=es-ES`)
  const similares = data.results
  createAfiches(similares, lastSimilar, { type: media, lazyLoad: true, clean: true })
}
export async function getInfoById({ id, media }) {
  const { data: movie } = await api(`${media}/${id}?language=es-ES`)
  const { data: credit } = await api(`${media}/${id}/credits?language=en-US`)
  const { data: provider } = await api(`${media}/${id}/watch/providers`)

  const column2 = document.querySelector(".column2")
  const moviePage = document.querySelector(".moviePage")
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
  //manejo de info(año)
  const yearMovie = document.querySelector(".year")
  if (media === "movie") {
    yearMovie.innerHTML = "Estrenada: " + movie.release_date.split("-")[0]
  } else {
    yearMovie.innerHTML = "Estrenada: " + movie.first_air_date.split("-")[0]
  }
  const movieScore = document.querySelector(".rating")
  movieScore.innerHTML = "Calificación: " + movie.vote_average + " / 10"
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
  //manejo de info(generos)
  const column1 = document.querySelector(".column1")
  column1.innerHTML = ""
  const tags = movie.genres
  tags.forEach(t => {
    const generos = document.createElement("span")
    generos.classList.add("tag")
    generos.textContent = t.name + " / "
    column1.appendChild(generos)
    generos.addEventListener("click", () => {
      location.hash = "#category=" + t.id
    })
  })


   //manejo interacciones
   const interaction =document.querySelector(".interaction")
   //manejo corazoncito
   const btnMovieLiked = document.createElement("img")
   btnMovieLiked.id = "btnMovie-liked"
   if(media==="movie"){
   addMovieList(movie,btnMovieLiked)}else{
   addTvList(movie,btnMovieLiked)}
   //manejo de comentarios y rank
   const commentInput = document.querySelector(".interaction input")
   const rankInput = document.querySelector(".inputRank")
   const btnRankMovie =document.querySelector("#btnRankMovie")
   const commentText = document.createElement("p");
   const rankText = document.createElement("p");
   let interactionData={} 
  //  if(interactionData==={}){
  //   commentInput.value = ""   
  //  }else{
  //   commentText
  //  }
   const btnComment =document.createElement("button")   
   btnComment.id="btnComment"
   btnComment.addEventListener("click", async () => {
     // Guardar el comentario antes de reemplazar el input
     interactionData = {
       comment: commentInput.value
     };      
     // Agregar la interacción (enviar el comentario al servidor)
     const comentar = await addInteraction(media, movie, interactionData);       
     console.log("Comentario agregado", comentar);
     // Reemplazar el input con un texto fijo que muestre el comentario
   commentText.textContent = commentInput.value;      
   // Reemplazar el input por el nuevo elemento de texto
   commentInput.replaceWith(commentText);   
   }); 
   btnRankMovie.addEventListener("click",async()=>{
    interactionData={rank: rankInput.value}      
    const rank = await addInteraction(media,movie,interactionData)
    rankText.textContent = rankInput.value;      
    // Reemplazar el input por el nuevo elemento de texto
    rankInput.replaceWith(rankText);    
    console.log("Puntuacion agregada", rank);
   })  
  //  interaction.appendChild(btnMovieLiked)
  //  interaction.appendChild(btnRankMovie)
  // interaction.appendChild(rankInput)
  // interaction.appendChild(commentInput)
  // interaction.appendChild(btnComment)
 
   

  //manejo de info(overview)
  const overview = document.querySelector(".overview")
  if (!movie.overview) {
    overview.innerHTML = "Sin descripción"
  } else {
    overview.innerHTML = movie.overview
  }

  column2.appendChild(overview)
  moviePage.appendChild(column2)

  // createLogoProviderByid
  const logos = document.querySelector(".logos")
  logos.innerHTML = ""
  const isoCou = Object.values(idCountry() || { iso_3166_1: "AR" })
  const iso_3166_1 = isoCou[0].iso_3166_1 || Object.values({ iso_3166_1: "AR" })
  if (!provider.results[iso_3166_1] || !provider.results[iso_3166_1].flatrate && !provider.results[iso_3166_1].free) {
    console.log("No esta")
    moviePage.appendChild(logos)

  } else {
    const providerByCountry = provider.results[iso_3166_1].flatrate || provider.results[iso_3166_1].free || []
    
    moviePage.appendChild(logos)

    providerByCountry.forEach(id => {
      const providerImg = document.createElement("img")
      providerImg.classList.add("logoProvider")
      providerImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + id.logo_path)
      logos.appendChild(providerImg)
      moviePage.appendChild(logos)
    })
  }
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
      castName.innerHTML = `<h1 style="color: red; font-size: 21px;">Director :</h1> ${act.name}   `
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
    column2.appendChild(containerCast)
  })

  //manejo de la refe para margin-top entre cast y video 

  const refeCast = containerCast.getBoundingClientRect().bottom;
  const footerMovie = document.querySelector(".footerMovie")
  footerMovie.style.marginTop = refeCast+ "px"

  moviePage.appendChild(footerMovie)

} 
