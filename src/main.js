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
  export function createMovies(movies, container) {
    container.innerHTML = '';  
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
      });  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w200' + movie.poster_path,
      );  
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
  }
  export function createCategories(categories, container, id, nombre) {    
    container.innerHTML = "";
    categories.forEach(category => {        
    const categoryOptions = document.createElement("option")     
    categoryOptions.value = category[id]
    categoryOptions.textContent = category[nombre]
    container.appendChild(categoryOptions)    
  })
  container.addEventListener("change",()=>{    
    const catId= container.value
  location.hash= `#category=${catId}`})
  }
  export async function getCategoriesPreview() {
    const apiDropDown = document.getElementById("apiDropdown");
    const { data } = await api('genre/movie/list');
    const categories = data.genres;  
    createCategories(categories, apiDropDown, "id", "name")  ;
  }
  // export async function getCountryPreview(){
  //   const apiDropDownPais = document.getElementById("apiDropdownPais");
  //   const { data } = await api('configuration/countries?language=es-LA');
  //   const categories = data;  
  //   createCategories(categories, apiDropDownPais,"iso_3166_1", "native_name")  ;  }

  export async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;  
    console.log(movies) 

    createMovies(movies, last);
  } 
  export async function getMoviesByCountry(pais){
    const { data } = await api('discover/movie', {
      params: {
        with_origin_country: pais,
      },
    });
    const movies = data.results;
    console.log(movies) 
    createMovies(movies, last);
  }
    export async function getTrendingMoviesPreview() {
      const { data } = await api('trending/all/day');
      const movies = data.results;
      console.log(movies)
      createMovies(movies,last)
              }
    export async function getMoviesBySearch(query) {
                const { data } = await api('search/movie', {
                  params: {
                    query,
                  },
                });
                const movies = data.results;
              
                createMovies(movies, last);
              }
            

           