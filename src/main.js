import { API_KEY } from "./apiKey.js";
import {base64, base64Cast, base64NextBtn, base64PrevBtn} from "./imagesDefault.js"
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

function idCountry() {
  const item = JSON.parse(localStorage.getItem("id_country"))
  let idCountry
  if (item && item!==undefined) {
    idCountry=item   
  }
  else{
    idCountry=null
  }
  return idCountry
}
function idCountrySelect(idC) {
  const addIdC = {}
  if(idC && idC.iso_3166_1){
      addIdC[idC.iso_3166_1]=idC
  }else{
    addIdC[idC.iso_3166_1]=undefined
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
  countryList.textContent="Ubicación"
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
},options)
function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem("liked_movie"))
  let movies;
  if (item) {
    movies = item
  } else {
    movies = {}
  }
  return movies
}
function likedTvList(){
  const item = JSON.parse(localStorage.getItem("liked_tv"))
  let tvs;
  if (item) {
    tvs = item
  } else {
    tvs = {}
  }
  return tvs
}
function likeMovie(movie) {
  const addedMovies = likedMoviesList()
  if (addedMovies[movie.id]) {
    //eliminar
    addedMovies[movie.id] = undefined
  } else {
    //agregar
    addedMovies[movie.id] = movie
  }
  localStorage.setItem("liked_movie", JSON.stringify(addedMovies))
}
function likeTvs(tv){
  const addedTvs=likedTvList()
  if(addedTvs[tv.id]){
    addedTvs[tv.id]=undefined
  }else{
    addedTvs[tv.id]=tv
  }
  localStorage.setItem("liked_tv",JSON.stringify(addedTvs))
}
export async function createAfiches(afiche, container, {
  type= "movie"||"tv",
  lazyLoad = false,
  clean = true
} = {}
) {
  if (clean) {
    container.innerHTML = '';
  }
  for (const movie of afiche) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('card');
    movieContainer.addEventListener('click', async () => {
      const { data: aficheDetail } = await api(`${type}/${movie.id}?language=es-LA`)
      const { data: creditPreview } = await api(`${type}/${movie.id}/credits?language=es-LA`);      
      const movieTitleText = document.createElement("h1")
      movieTitleText.classList.add("movieTitleText")
      movieTitleText.innerHTML = type==="movie"?aficheDetail.original_title
      :aficheDetail.original_name
      const movieYearPreview = document.createElement("h2")
      movieYearPreview.innerHTML =  type==="movie"? aficheDetail.release_date.split("-")[0] 
      :aficheDetail.first_air_date.split("-")[0]
      const movieScorePreview = document.createElement("h2")
      movieScorePreview.innerHTML = "Valoracion: " + aficheDetail.vote_average + "/10"

      const movieDirectingPreview = document.createElement("h2")
      movieDirectingPreview.classList.add("movieDirectingPreview")
      const created = type==="movie"?creditPreview.crew.filter((casting) => casting.known_for_department === "Directing").slice(0, 1)
      :aficheDetail.created_by.slice(0, 1)
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
      const btnMovieById = document.createElement("button")
      btnMovieById.classList.add("btnMovie-id")
      if(type==="movie"){
        btnMovieById.addEventListener("click", () => {
          location.hash="#media-movie=" + movie.id;
        })
      }else{
        btnMovieById.addEventListener("click", () => {
          location.hash="#media-tv=" + movie.id;
        })
      }
      const btnMovieLiked = document.createElement("button")
      btnMovieLiked.classList.add("btnMovie-liked")      
      if(type==="movie"){
        likedMoviesList()[movie.id]&& btnMovieLiked.classList.add("btnMovie-likeded")
        btnMovieLiked.addEventListener("click", () => {
          btnMovieLiked.classList.toggle("btnMovie-likeded")
          likeMovie(movie)
          getLikedMovie()        
        })
      }else{
         likedTvList()[movie.id]&&btnMovieLiked.classList.add("btnMovie-likeded")
         btnMovieLiked.addEventListener("click", () => {
           btnMovieLiked.classList.toggle("btnMovie-likeded")
           likeTvs(movie)
           getLikedTv()
         })
      }      
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
         movieImg.addEventListener("error",()=>{
      if (movieImg.dataset.triedLocal === "false") {
        movieImg.setAttribute(        
          "src",base64 )
        movieImg.dataset.triedLocal = "true";
      }      
     })
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  }
}
export function getLikedMovie() {
  const addedMovies = likedMoviesList()
  const movies = Object.values(addedMovies)
  createAfiches(movies, lastLiked, {type:"movie", lazyLoad: true, clean: true }) 
}
export function getLikedTv(){
  const addedTvs = likedTvList()
  const tvs = Object.values(addedTvs)
  createAfiches(tvs, lastLikedTv, {type:"tv", lazyLoad: true, clean: true }) 
}
export function createCategories(categories, container, id, nombre) {
  container.innerHTML= ""  
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
      if(catId===""){
        container.value = "";
      }else if(!isNaN(catId)) {        
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
  const { data: genero } = await api("genre/"+media+"/list");
  const { data: country } = await api('configuration/countries?language=es-LA');
  const countrys = country
  const generos = genero.genres;
  createCategories(generos, apiDropDown, "id", "name");
  createCategories(countrys, apiDropDownPais, "iso_3166_1", "native_name");  
}
let maxPage;
let page=1;
export function getScrollInfinite({ url, query = undefined, searchBy =undefined,type="movie" }) {
  return async function () {
    page++;
    const parameter = { page}
      console.log(page)   
      if (searchBy === '#categoryByGenre=') {parameter.with_genres = query}
      if (searchBy === 'search') {parameter.query = query}
      if (searchBy === "#categoryByAct=") {parameter.with_cast = query}
      if (searchBy === "#categoryByAct=") {parameter.query = query}
      if (searchBy === "#categoryByCountry=") {parameter.with_origin_country = query}
      const { data } = await api(url, {
        params: parameter
      })      
        const movies = data.results
        createAfiches(movies, last, { type, lazyLoad: true, clean: false })       
    } 
}
export async function getTrendingHome(media) {
    const { data:movie } = await api("trending/"+media+"/day")
    const movies = movie.results.slice(0,4)
    movies.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movies, lastTrend, { type:media, lazyLoad: true, clean: true })
}
export async function getRankHome(media) {
    const { data:movie } = await api(media+'/top_rated')
    const movies = movie.results.slice(0,4)
    movies.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movies, lastRank, { type:media, lazyLoad: true, clean: true })
}
export async function getTrendingPreview(media) {
    const { data } = await api("trending/"+media+"/day")  
    const movies = data.results  
    movies.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movies, last, { type:media, lazyLoad: true, clean: true }) 
}
export async function getRankPreview(media) {
    const { data } = await api(media+"/top_rated")
    const movie = data.results
    movie.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movie, last, { type:media, lazyLoad: true, clean: true })
}

export async function getInfoByAct({id,media}) { 
    if(media==="movie"){
      const { data } = await api('discover/movie', {
        params: {
          with_cast: id
        }
      });
      const movies = data.results;
      movies.sort((a, b) => b.vote_average - a.vote_average)
      createAfiches(movies, last, { type:"movie", lazyLoad: true, clean: true }) 
    }else{
      const { data } = await api('person/'+id+"/tv_credits");
      const credits = data.cast;
      credits.sort((a, b) => b.vote_average - a.vote_average)
      createAfiches(credits, last, { type:"tv", lazyLoad: true, clean: true })
    }     
}
export async  function getByCountry({id,media}) {
  const { data } = await api("discover/"+media, { params: { with_origin_country: id } })
  const movie = data.results;
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type:media, lazyLoad: true, clean: true })  
}
export async function getByGenres({id,media}) {
    const { data } = await api('discover/'+media, {
      params: {
        with_genres: id,
        page
      }
    });
    maxPage = data.total_pages
    const movies = data.results;
    movies.sort((a, b) => b.vote_average - a.vote_average)
    createAfiches(movies, last, { type:media, lazyLoad: true, clean: true })    
}
export async function getBySearch({query,media}) { 
    const { data } = await api("search/"+media, {
      params: {
        query,
      },
    });
    const movie = data.results;
    createAfiches(movie, last, { type:media, lazyLoad: true, clean: true }) 
}
export async function getById({id,media}) {
  const { data: movie } = await api(`${media}/${id}?append_to_response=videos,images`);
  const carrousel = []
  const headerSection = document.querySelector(".afiche")
  const containerVid = document.querySelector(".carousel__slide")
  const poster= document.querySelector(".poster")
  poster.innerHTML=""
  const movieImg = document.createElement('img');
  const movieVideo = movie.videos.results
  movieImg.setAttribute("src", 'https://image.tmdb.org/t/p/w400' + movie.poster_path)
  movieImg.dataset.triedLocal = "false";
     movieImg.addEventListener("error",()=>{
      if (movieImg.dataset.triedLocal === "false") {
        movieImg.setAttribute(        
          "src",base64 )
        movieImg.dataset.triedLocal = "true";
        movieImg.style.width = "400px"; // Establecer el ancho deseado
        movieImg.style.height = "600px"; // Establecer la altura deseada
      }      
     })
   poster.appendChild(movieImg)
     movieVideo.forEach(vid => {
    const video = document.createElement("iframe")
    video.setAttribute("src", `https://www.youtube.com/embed/${vid.key}`)
    video.setAttribute("width", "900"); // Ajusta el ancho
    video.setAttribute("height", "450"); // Ajusta la altura
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
  function carrouselVideos(){
    containerVid.innerHTML = ""

    const imgNext=document.createElement("img")
    imgNext.src=base64NextBtn
  const imgPrev=document.createElement("img")
  imgPrev.src=base64PrevBtn
  if(carrousel.length===0){
    console.log("sin videos")
    headerSection.style.display="none"
  }else{
    headerSection.style.display="flex"
    const nextBtn = document.createElement("button")
    nextBtn.classList.add("nextBtn")    
    nextBtn.appendChild(imgNext)
  nextBtn.addEventListener("click", next)
  
  const prevBtn = document.createElement("button")
  prevBtn.classList.add("prevBtn")
  prevBtn.appendChild(imgPrev)  
  prevBtn.addEventListener("click", prev)

    showCarrousel(contIndex);
    headerSection.appendChild(nextBtn)
    headerSection.appendChild(prevBtn)
    headerSection.appendChild(containerVid)
  }
  }
  headerSection.innerHTML = ""
  carrouselVideos()
}
export async function getSimilarById({id,media}) {
  const { data } = await api(`${media}/${id}/similar?language=es-ES`)
  const similares = data.results
  createAfiches(similares, lastSimilar, { type:media, lazyLoad: true, clean: true })
}
export async function getInfoById({id,media}) {
  
    const { data: movie } = await api(`${media}/${id}?language=es-ES`)
    const { data: credit } = await api(`${media}/${id}/credits?language=en-US`)
    const { data: provider } = await api(`${media}/${id}/watch/providers`)

    const column2 = document.querySelector(".column2")
    const moviePage = document.querySelector(".moviePage")
    //titulo original y en español
    const movieTitleOriginal = document.querySelector(".title1")
    const movieTitleEs = document.querySelector(".title2")
    movieTitleEs.innerHTML = ""
    if(media==="movie"){
      if (movie.title === movie.original_title) {
        movieTitleOriginal.textContent = movie.original_title
      }else{
          movieTitleEs.textContent = movie.title
          movieTitleOriginal.textContent = movie.original_title
        }
    }else if(media==="tv"){
      if(movie.title === movie.original_name){
        movieTitleOriginal.textContent = movie.original_name
      }else{
        movie.original_name
        movieTitleOriginal.textContent = movie.original_name
      }      
    }
    
    //manejo de info(año)
    const yearMovie = document.querySelector(".year")
    if(media==="movie"){
      yearMovie.innerHTML = "Estrenada: " +  movie.release_date.split("-")[0]
    }else{
      yearMovie.innerHTML = "Estrenada: " + movie.first_air_date.split("-")[0]
     }
    
    //manejo de info(score)
    const movieScore = document.querySelector(".rating")
    movieScore.innerHTML = "Calificación: " + movie.vote_average + " / 10"
    //manejo de info(overview)
    const overview = document.querySelector(".overview")
    if(!movie.overview){
      overview.innerHTML = "Sin descripción"
    }else{
      overview.innerHTML = movie.overview
    }
    
    //manejo de info(origen)
    const origenMovie = movie.production_countries
    const containerOrigen = document.querySelector(".origenCountry")
    containerOrigen.innerHTML = ""
    origenMovie.forEach(o => {
      const origen = document.createElement("span")
      origen.classList.add("origen")
      origen.innerHTML = o.name+" /"
      containerOrigen.appendChild(origen)
      origen.addEventListener("click", () => {
        location.hash = "#category=" + o.iso_3166_1
      })
    })

    // createLogoProviderByid
    const logos = document.querySelector(".logos")
    logos.innerHTML = ""
    const iso_3166_1 = idCountry()
    console.log(iso_3166_1)
    console.log(provider.results)
    if (!provider.results[iso_3166_1]||!provider.results[iso_3166_1].flatrate||!provider.results[iso_3166_1].free) {
      console.log("No esta")
      const logosMensaje= document.createElement("h2")
      logosMensaje.classList.add("logosMensaje")
      logosMensaje.innerHTML="No disponible en tu pais, en las principales plataformas"
      logos.appendChild(logosMensaje)
    } else {
      const providerByCountry = provider.results[iso_3166_1].flatrate || provider.results[iso_3166_1].free || []
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
    const directing = media==="movie"? credit.crew.filter((casting) => casting.known_for_department === "Directing").filter((cast)=>cast.job==="Director")
    :movie.created_by.slice(0, 2)
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
      castImg.addEventListener("error",()=>{
        castImg.setAttribute("src", base64Cast)
      })

      castName.addEventListener("click", () => {
        location.hash = "#categoryByAct=" + castId + "-" + act.name
      })
      containerCast.appendChild(castName)
      containerCast.appendChild(castImg)
      column2.appendChild(containerCast)
    })
    //manejo de info(generos)
    const column1 = document.querySelector(".column1")
    column1.innerHTML = ""
    const tags = movie.genres
    tags.forEach(t => {
      const generos = document.createElement("span")
      generos.classList.add("tag")
      generos.textContent = t.name+" / "
      column1.appendChild(generos)
      generos.addEventListener("click", () => {
        location.hash = "#category=" + t.id
      })
    })
  } 
