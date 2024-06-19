import { API_KEY } from "./apiKey.js";
// const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    }
  });
  async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies)
    movies.forEach(element => {
        const container = document.querySelector(".last")
        const carrousel=document.createElement("div")
        carrousel.classList.add("column-one-quarter")
        const movieImg = document.createElement("img")
        movieImg.setAttribute("alt", element.title)
        movieImg.setAttribute(
            "src",
             'https://image.tmdb.org/t/p/w300'+ element.poster_path)
             carrousel.appendChild(movieImg)
             container.appendChild(carrousel)
             });}


             async function getTrendingSerie(){
             const {data}  = await api('trending/tv/day');
             const series = data.results;
             console.log(series)
             series.forEach(element => {
                const container = document.querySelector(".last2")
                const carrousel=document.createElement("div")
                carrousel.classList.add("column-one-quarter")
                const movieImg = document.createElement("img")
                movieImg.setAttribute("alt", element.title)
                movieImg.setAttribute(
                    "src",
                     'https://image.tmdb.org/t/p/w300'+ element.poster_path)
                     carrousel.appendChild(movieImg)
                     container.appendChild(carrousel)
                     })
            }              
  getTrendingMoviesPreview()
  getTrendingSerie()