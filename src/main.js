import { API_KEY } from "./apiKey.js";
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
  console.log(idCountry)
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
  console.log(forCountry)
  createCategoriesProvider(forCountry, apiDropDownPaisProvider, "iso_3166_1", "native_name")
}
function createCategoriesProvider(categories, container, id, name) {
  container.innerHTML = ""
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
let maxPage;
let page = 1
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
  console.log(tvs)

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
      const origenCountry = aficheDetail.production_countries.slice(0, 1)
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
    //  movieImg.addEventListener("error",()=>{
    //   movieImg.setAttribute(
    //     "src","https://image.tmdb.org/t/p/w500"+movie.title
    //   )
    //  })
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  }
}
export function getLikedMovie() {
  const addedMovies = likedMoviesList()
  const movies = Object.values(addedMovies)
  console.log(movies)
  createAfiches(movies, lastLiked, {type:"movie", lazyLoad: true, clean: true }) 
}
export function getLikedTv(){
  const addedTvs = likedTvList()
  const tvs = Object.values(addedTvs)
  console.log(tvs)
  createAfiches(tvs, lastLikedTv, {type:"tv", lazyLoad: true, clean: true }) 
}
export function createCategories(categories, container, id, nombre) {
  container.innerHTML = "";
  categories.forEach(category => {
    const categoryOptions = document.createElement("option")
    categoryOptions.value = category[id]
    categoryOptions.textContent = category[nombre]
    container.appendChild(categoryOptions)
  })
  container.addEventListener("change", () => {
    const catId = container.value
    const catName = container.textContent
    // const catNameArray = catName.match(/([A-Z][a-záéíóúüñ]+(?:\s+[a-záéíóúüñ]+)*)/g)
    if (!isNaN(catId)) {
      location.hash = `#categoryByGenre=${catId}`
    } else {
      location.hash = `#categoryByCountry=${catId}`
    }
  })
}

export function getScrollInfinite({ url, query = undefined, searchBy = undefined,type="movie" }) {
  return async function () {
    const parameter = { page}
    console.log(page)
    console.log(maxPage)
    if (searchBy === '#categoryByGenre=') parameter.with_genres = query
    if (searchBy === 'search') parameter.query = query
    if (searchBy === "#categoryByAct=") parameter.with_cast = query
    if (searchBy === "#categoryByAct=") parameter.query = query

    if (searchBy === "#categoryByCountry=") parameter.with_origin_country = query

    const { data } = await api(url, {
      params: parameter
    })
    const movies = data.results
    console.log(movies)
  createAfiches(movies, last, { type, lazyLoad: true, clean: false })
  // createAfiches(movies, lastSimilar, { type, lazyLoad: true, clean: false })

        page++;
  }
}
export async function getTrendingMoviesPreview() {
  const { data } = await api('movie/popular')  
  const movies = data.results
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type:"movie", lazyLoad: true, clean: true })
}
export async function getTrendingTvPreview() {
  const { data } = await api("tv/popular")
  const tv = data.results
  tv.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(tv, last, { type:"tv", lazyLoad: true, clean: true })
}

export async function getCategoriesPreview() {
  const apiDropDown = document.getElementById("apiDropdown");
  const { data: genero } = await api('genre/movie/list');
  const apiDropDownPais = document.getElementById("apiDropdownPais");
  const { data: country } = await api('configuration/countries?language=es-LA');
  const countrys = country
  const generos = genero.genres;
  createCategories(generos, apiDropDown, "id", "name");
  createCategories(countrys, apiDropDownPais, "iso_3166_1", "native_name");
}
export async function getCategoriesTvPreview() {
  const apiDropDown = document.getElementById("apiDropdown");
  const { data: genero } = await api('genre/tv/list');
  const apiDropDownPais = document.getElementById("apiDropdownPais");
  const { data: country } = await api('configuration/countries?language=es-LA');
  const countrys = country
  const generos = genero.genres;
  createCategories(generos, apiDropDown, "id", "name");
  createCategories(countrys, apiDropDownPais, "iso_3166_1", "native_name");
}
export async function getInfoMovieByAct(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_cast: id
    }
  });
  const movies = data.results;
  console.log(data)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type:"movie", lazyLoad: true, clean: true })
}
export async function getInfoTvByAct(id) {
  const { data } = await api('person/'+id+"/tv_credits");

  const movies = data.cast;
  console.log(movies)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type:"tv", lazyLoad: true, clean: true })
}

export async function getMoviesByCountry(id) {
  const { data } = await api("discover/movie", { params: { with_origin_country: id } })
  const movie = data.results;
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type:"movie", lazyLoad: true, clean: true })
}

export async function getMoviesByGenres(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
      page
    }
  });
  maxPage = data.total_pages
  const movies = data.results;
  console.log(movies)
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type:"movie", lazyLoad: true, clean: true })
}
export async function getTvByCountry(id) {
  const { data } = await api("discover/tv", { params: { with_origin_country: id } })
  const movie = data.results;
  movie.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movie, last, { type:"tv", lazyLoad: true, clean: true })
}
export async function getTvByGenres(id) {
  const { data } = await api('discover/tv', {
    params: {
      with_genres: id,
      page
    }
  });
  maxPage = data.total_pages
  const movies = data.results;
  movies.sort((a, b) => b.vote_average - a.vote_average)
  createAfiches(movies, last, { type:"tv", lazyLoad: true, clean: true })
}
export async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });
  const media = data.results;
  console.log(media)
  createAfiches(media, last, { type:"movie", lazyLoad: true, clean: true })
}
export async function getTvBySearch(query) {
  const { data } = await api('search/tv', {
    params: {
      query,
    },
  });
  const media = data.results;
  console.log(media)
  createAfiches(media, last, { type:"tv", lazyLoad: true, clean: true })}
export async function getTvById(id) {
  const { data: movie } = await api(`tv/${id}?append_to_response=videos,images`);
  const carrousel = []

  const headerSection = document.querySelector(".afiche")
  const containerVid = document.querySelector(".carousel__slide")

  const movieImg = document.createElement('img');
  const movieVideo = movie.videos.results

  movieImg.setAttribute("src", 'https://image.tmdb.org/t/p/w400' + movie.poster_path)
  carrousel.push(movieImg)

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
  showCarrousel(contIndex);
  const nextBtn = document.querySelector(".nextBtn")
  nextBtn.addEventListener("click", next)

  const prevBtn = document.querySelector(".prevBtn")
  prevBtn.addEventListener("click", prev)

  headerSection.appendChild(containerVid)
}
export async function getMovieById(id) {
  const { data: movie } = await api(`movie/${id}?append_to_response=videos,images`);
  const carrousel = []

  const headerSection = document.querySelector(".afiche")
  const containerVid = document.querySelector(".carousel__slide")

  const movieImg = document.createElement('img');
  const movieVideo = movie.videos.results

  movieImg.setAttribute("src", 'https://image.tmdb.org/t/p/w400' + movie.poster_path)
  carrousel.push(movieImg)

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
  showCarrousel(contIndex);
  const nextBtn = document.querySelector(".nextBtn")
  nextBtn.addEventListener("click", next)

  const prevBtn = document.querySelector(".prevBtn")
  prevBtn.addEventListener("click", prev)

  headerSection.appendChild(containerVid)
}
export async function getSimilarMovieById(id) {
  const { data: movie } = await api("movie/" + id + "/similar?language=es-ES")
  const similares = movie.results
  console.log(similares)

  createAfiches(similares, lastSimilar, { type:"movie", lazyLoad: true, clean: true })
}
export async function getSimilarTvById(id) {
  const { data: movie } = await api("tv/" + id + "/similar?language=es-ES")
  const similares = movie.results
  createAfiches(similares, lastSimilar, { type:"tv", lazyLoad: true, clean: true })
}
export async function getInfoMovieById(id) {
  try {
    const { data: movie } = await api("movie/" + id + "?language=es-ES")
    const { data: credit } = await api(`movie/${id}/credits?language=en-US`)
    const { data: provider } = await api(`movie/${id}/watch/providers`)

    const column2 = document.querySelector(".column2")
    const moviePage = document.querySelector(".moviePage")
    //titulo original y en español
    const movieTitleOriginal = document.querySelector(".title1")
    const movieTitleEs = document.querySelector(".title2")
    movieTitleEs.innerHTML = ""
    if (movie.title === movie.original_title) {
      movieTitleOriginal.textContent = movie.original_title
    } else {
      movieTitleEs.textContent = movie.title
      movieTitleOriginal.textContent = movie.original_title
    }
    //manejo de info(año)
    const yearMovie = document.querySelector(".year")
    yearMovie.innerHTML = "Estrenada: " + movie.release_date.split("-")[0]
    //manejo de info(score)
    const movieScore = document.querySelector(".rating")
    movieScore.innerHTML = "Calificación: " + movie.vote_average + " / 10"
    //manejo de info(overview)
    const overview = document.querySelector(".overview")
    overview.innerHTML = movie.overview
    //manejo de info(origen)
    const origenMovie = movie.production_countries
    const containerOrigen = document.querySelector(".origenCountry")
    containerOrigen.innerHTML = ""
    origenMovie.forEach(o => {
      const origen = document.createElement("span")
      origen.classList.add("origen")
      origen.innerHTML = o.name
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
    console.log(provider.results[iso_3166_1])
    if (!provider.results[iso_3166_1]||!provider.results[iso_3166_1].flatrate||!provider.results[iso_3166_1].free) {
      console.log("No esta")
    } else {
      const providerByCountry = provider.results[iso_3166_1].flatrate || provider.results[iso_3166_1].free || []
      providerByCountry.forEach(id => {
        console.log(logos)
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
    const directing = credit.crew.filter((casting) => casting.known_for_department === "Directing").slice(0, 1)
    console.log(directing)
    const castTotal = [...acting, ...directing]
    console.log(castTotal)
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
      generos.textContent = t.name
      column1.appendChild(generos)
      generos.addEventListener("click", () => {
        location.hash = "#category=" + t.id
      })
    })

  } catch (error) {
    console.error(error)
  }
}
export async function getInfoTvById(id) {
  try {
    const { data: movie } = await api("tv/" + id + "?language=es-ES")
    const { data: credit } = await api(`tv/${id}/credits?language=en-US`)
    const { data: provider } = await api(`tv/${id}/watch/providers`)

    const column2 = document.querySelector(".column2")
    const moviePage = document.querySelector(".moviePage")
    //titulo original y en español
    const movieTitleOriginal = document.querySelector(".title1")
    const movieTitleEs = document.querySelector(".title2")
    movieTitleEs.innerHTML = ""
    if (movie.title === movie.original_name) {
      movieTitleOriginal.textContent = movie.original_name
    } else {
      movieTitleEs.textContent = movie.title
      movieTitleOriginal.textContent = movie.original_name
    }
    //manejo de info(año)
    const yearMovie = document.querySelector(".year")
    yearMovie.innerHTML = "Estrenada: " + movie.first_air_date.split("-")[0]
    //manejo de info(score)
    const movieScore = document.querySelector(".rating")
    movieScore.innerHTML = "Calificación: " + movie.vote_average + " / 10"
    //manejo de info(overview)
    const overview = document.querySelector(".overview")
    overview.innerHTML = movie.overview
    //manejo de info(origen)
    const origenMovie = movie.production_countries
    const containerOrigen = document.querySelector(".origenCountry")
    containerOrigen.innerHTML = ""
    origenMovie.forEach(o => {
      const origen = document.createElement("span")
      origen.classList.add("origen")
      origen.innerHTML = o.name
      containerOrigen.appendChild(origen)
      origen.addEventListener("click", () => {
        location.hash = "#category=" + o.iso_3166_1
      })
    })

    // createLogoProviderByid
    const logos = document.querySelector(".logos")
    logos.innerHTML = "" 
    const objCountry=idCountry()   
    const idC=Object.keys(objCountry)[0]
    console.log(provider.results[idC])
    if (!provider.results[idC]&&!provider.results[idC].flatrate&&!provider.results[idC].free) {
      console.log("No esta")
    } else {
      const providerByCountry = provider.results[idC].flatrate || provider.results[idC].free || []
      providerByCountry.forEach(id => {
        console.log(logos)
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
    const directing = movie.created_by.slice(0, 2)
    console.log(directing)
    const castTotal = [...acting, ...directing]
    console.log(castTotal)
    const containerCast = document.querySelector(".castMovie")
    containerCast.innerHTML = ""
    castTotal.forEach(act => {
      const castName = document.createElement("h1")
      castName.classList.add("castName")
      if (act.known_for_department === "Directing") {

        castName.innerHTML = `<h1 style="color: red; font-size: 21px;">Creador :</h1> ${act.name}   `
      } else {
        castName.innerHTML = act.name
      }
      const castId = act.id
      const castImg = document.createElement("img")
      castImg.classList.add("movieImg")
      castImg.setAttribute("src", "https://image.tmdb.org/t/p/w200" + act.profile_path)

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
      generos.textContent = t.name
      column1.appendChild(generos)
      generos.addEventListener("click", () => {
        location.hash = "#category=" + t.id
      })
    })

  } catch (error) {
    console.error(error)
  }
}