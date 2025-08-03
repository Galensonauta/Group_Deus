// ========== IMPORTS ==========
import "@styles/main.css";
import {  loginUser,  logoutUser,  createUser,  isAuthenticated,} from './auth.mjs';
import { getProvider } from './provider.mjs';
import {getCategoriesPreview} from "./genresCountry.mjs"
import {getByGenres,  getByCountry,getTrendingPreview,getInfoByActByMovie,  getInfoByActByTv}from "./categoryBy.mjs"
import { observer, setPaginationMode, resetPagination } from './paginationObserver.mjs';
import { base64GitHub } from "@imagesDefault";

// ========== VARIABLES ==========
let mode = false;        // false = cine, true = series
let nroPage = 1;

// ========== UI SETUP ==========
document.querySelector("#btnUserLog").addEventListener("click", () => location.hash = "#login=");
document.querySelector("#btnUserLogOut").addEventListener("click", logoutUser);
document.querySelector("#btnUserSign").addEventListener("click", () => location.hash = "#sign=");
document.querySelector("#btnEnter").addEventListener("click", () => loginUser(
  document.querySelector(".inputNick").value,
  document.querySelector(".input-pass").value
));
document.querySelector("#btnCreateUser").addEventListener("click", () => createUser(
  document.querySelector(".inputNewNick").value,
  document.querySelector(".input-new-pass").value
));

const modeH1 = document.querySelector("#modeH1");
modeH1.addEventListener("click", () => {
  mode = !mode;
  document.getElementById("portada").classList.toggle("cine", !mode);
  document.getElementById("portada").classList.toggle("series", mode);
  modeH1.textContent = mode ? "Series" : "Cine";
  location.hash = mode ? "#Series" : "#Cine";
});

// Búsqueda
document.querySelector("#btnSearch").addEventListener("click", handleSearch);
document.querySelector(".input-search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
function handleSearch() {
  const input = document.querySelector(".input-search");
  location.hash = "#search=" + input.value;
  input.value = "";
}

// Footer GitHub
const imgGitHub = document.createElement("img");
imgGitHub.src = base64GitHub;
imgGitHub.classList.add("imgGitHub");
imgGitHub.addEventListener("click", () => window.open("https://github.com/Galensonauta/Group_Deus", "_blank"));
document.querySelector("footer").appendChild(imgGitHub);

// ========== ROUTER ==========

export function initializeNavigation() {
  window.addEventListener("DOMContentLoaded", navigator, false);
  window.addEventListener("hashchange", navigator, false);
}

function navigator() {
  const hash = location.hash;

  if (hash.startsWith("#login=")) return showLoginPage();
  if (hash.startsWith("#sign=")) return showSignUpPage();
  if (hash.startsWith("#search=")) return showSearchPage();
  if (hash.startsWith("#media-")) return showMediaDetails();
  if (hash.startsWith("#trend=")) return showTrendingPage();
  if (hash.startsWith("#rank=")) return showRankPage();
  if (hash.startsWith("#GdRank=")) return showRankGdPage();
  if (hash.startsWith("#categoryByAct=")) return showCategoryByActPage();
  if (hash.startsWith("#category=")) return showCategoryPage();

  if (!hash || hash === "#") {
    location.hash = mode ? "#Series" : "#Cine";
    return;
  }

  showHomePage();
  scrollToTop();
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ========== HOME ==========
function showHomePage() {
  nroPage = 1;
  showSections(["portada", "trendRank", "containerLiked"]);
  portadaBlackMirror();

  const media = mode ? "tv" : "movie";

requestIdleCallback(async () => {
  const [{ getTrendingHome, getRankHomeImdb, getRankHomeGd }, { getCategoriesPreview }, { getProvider }] = await Promise.all([
    import("./ranking.mjs"),
    import("./genresCountry.mjs"),
    import("./provider.mjs"),
  ]);

  getCategoriesPreview(media);
  getTrendingHome(media);
  getRankHomeImdb({ media, nroPage });
  getRankHomeGd(media);
  getProvider();
});
 isAuthenticated().then(async (isAuth) => {
  if (isAuth) {
    const { getLikedMovie, getLikedTv } = await import("./liked.mjs");
    getLikedMovie();
    getLikedTv();
  }
});

}

// ========== AUTH ==========
function showLoginPage() {
  showSections(["portada", "login"]);
  portadaBlackMirror();
}
function showSignUpPage() {
  showSections(["portada", "sign"]);
  portadaBlackMirror();
}

// ========== TRENDING ==========
function showTrendingPage() {
  showSections(["portada", "containerLast"]);
  const media = mode ? "tv" : "movie";
  getTrendingPreview(media);
  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
}

// ========== RANKING ==========
async function showRankPage() {
  nroPage = 1;
  showSections(["portada", "containerLast"]);
  const media = mode ? "tv" : "movie";
const { getRankPreview } = await import("./ranking.mjs");
getRankPreview({ media, nroPage });
  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
}
async function showRankGdPage() {
  nroPage = 1;
  showSections(["portada", "containerLastRankGd"]);
  const media = mode ? "tv" : "movie";
  const {getRankGdPreview}= await import("./ranking.mjs")
  getRankGdPreview(media)
  
  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
}

// ========== SEARCH ==========
async function showSearchPage() {
  nroPage = 1;
  showSections(["portada", "containerLast"]);

  const [_, query] = location.hash.split("=");
  const media = mode ? "tv" : "movie";

  const [{ getBySearch }, { getCategoriesPreview }, { getProvider }] = await Promise.all([
    import("./search.mjs"),
    import("./genresCountry.mjs"),
    import("./provider.mjs"),
  ]);

  getBySearch({ query, media, nroPage });
  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
setPaginationMode(mode); // para saber si es TV o movie
resetPagination();       // siempre reiniciar antes de paginar
observer.observe(document.getElementById("fin"));
}


// ========== CATEGORY ==========
function showCategoryByActPage() {
  nroPage = 1;
  showSections(["portada", "containerLast"]);
  const [_, id] = location.hash.split("=");

  const media = mode ? "tv" : "movie";
  const getInfoByAct = mode ? getInfoByActByTv : getInfoByActByMovie;

  getInfoByAct({ id, nroPage });
  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
setPaginationMode(mode); // para saber si es TV o movie
resetPagination();       // siempre reiniciar antes de paginar
observer.observe(document.getElementById("fin"));
}

function showCategoryPage() {
  nroPage = 1;
  showSections(["portada", "containerLast"]);
  const [_, data] = location.hash.split("=");
  const [id, name] = data.split("-");

  const media = mode ? "tv" : "movie";
  const isGenre = !isNaN(id);

  if (isGenre) {
    getByGenres({ id, media, nroPage });
  } else {
    getByCountry({ id, media, nroPage });
  }

  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
setPaginationMode(mode); // para saber si es TV o movie
resetPagination();       // siempre reiniciar antes de paginar
observer.observe(document.getElementById("fin"));
}

// ========== MEDIA DETAIL ==========
async function showMediaDetails() {
  showSections(["portada", "moviePage"]);
  const [_, id] = location.hash.split("=");
  const media = _.includes("tv") ? "tv" : "movie";

  // Cargar dinámicamente los módulos
  const [{ getById, getInfoById }] = await Promise.all([
    import("./movieDetails.mjs"),
  ]);

  const { getSimilarById } = await import("./similar.mjs");

  getById({ id, media });
  getInfoById({ id, media });
  getSimilarById({ id, media });

  const { getCategoriesPreview } = await import("./genresCountry.mjs");
  const { getProvider } = await import("./provider.mjs");

  getCategoriesPreview(media);
  getProvider();
  portadaBlackMirror();
}


// ========== UTILIDAD ==========
function showSections(visibleIds = []) {
  const sections = ["portada", "login", "sign", "trendRank", "containerLiked", "containerLast", "containerLastRankGd", "moviePage"];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("inactive", !visibleIds.includes(id));
  });
}

function portadaBlackMirror() {
  const title = document.querySelector(".titlePortadaSpan");
  title.innerHTML = "GrupoDeus";

  const h1 = document.querySelector(".titlePortadaH1");
  h1.setAttribute("data-text", "Grupo Deus");

  const div = document.querySelector(".titlePortada--header");
  div.addEventListener("click", () => {
    location.hash = mode ? "#Series" : "#Cine";
  });

  isAuthenticated().then((isAuth) => {
    const btnSign = document.getElementById("btnUserSign");
    const btnInicio = document.getElementById("btnUserLog");
    const btnSalir = document.getElementById("btnUserLogOut");

    if (isAuth) {
      btnSign.classList.add("inactive");
      btnInicio.classList.add("inactive");
      btnSalir.classList.remove("inactive");
    } else {
      btnSign.classList.remove("inactive");
      btnInicio.classList.remove("inactive");
      btnSalir.classList.add("inactive");
    }
  });
}
