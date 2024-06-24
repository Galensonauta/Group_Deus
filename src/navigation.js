import { getTrendingMoviesPreview,
  getCategoriesPreview, getMoviesByCategory, getMoviesBySearch,
  //  getCountryPreview, getMoviesByCountry,
  } from './main.js';

  const searchInput= document.querySelector(".search-box input")
 const btnSearch=document.querySelector("#btnSearch")
 btnSearch.addEventListener('click', () => {
    location.hash = '#search=' + searchInput.value;
    console.log("el hash cambio")
  });
  arrowBack.addEventListener('click', () => {
    history.back();
    // location.hash = '#home';
  })

 window.addEventListener('DOMContentLoaded', navigator, false);
 window.addEventListener('hashchange', navigator, false);
  function navigator() {
    console.log('navigator ejecutado');
  console.log('Location hash:', location.hash);

    if (location.hash.startsWith('#search=')) {
      console.log("en busqueda")
      searchPage();
    } else if (location.hash.startsWith('#movie=')) {
      movieDetailsPage();
    }
    else if (location.hash.startsWith("#category=")){
      console.log("en categorias")
      categoryPage()
    }
    else {
      console.log("en home")
      homePage();

    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  function homePage(){
    console.log("home")
    const portada = document.getElementById("portada");

    portada.classList.remove("inactive")
    getTrendingMoviesPreview()
    getCategoriesPreview()
    // getCountryPreview()

  }

  function searchPage(){
console.log("busqueda")
const portada = document.getElementById("portada");
    portada.classList.add("inactive")
 // ['#search', 'platzi']
 const [_, query] = location.hash.split('=');
 getMoviesBySearch(query);
  }
  function movieDetailsPage(){

  }
  function categoryPage(){
    console.log("categorias")
    const portada = document.getElementById("portada");
    portada.classList.add("inactive")
  //     // ['#category', 'id-name']
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  const collection=document.querySelector(".collection")
  collection.innerHTML=categoryName;
  console.log("categorias")
  getMoviesByCategory(categoryId)
  // getMoviesByCountry(categoryId)


}

