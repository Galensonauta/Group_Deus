// src/cast.mjs
import { base64Cast } from "@imagesDefault";

export function renderCast(castData, container) {
  container.innerHTML = "";
  castData.forEach(act => {
    const castName = document.createElement("h1");
    castName.classList.add("castName");
    castName.innerHTML = act.known_for_department === "Directing"
      ? `<h1 style="color: red; font-size: 21px;">${act.name}</h1>`
      : act.name;

    const castImg = document.createElement("img");
    castImg.classList.add("movieImg");
    castImg.setAttribute("src", `https://image.tmdb.org/t/p/w200${act.profile_path}`);
    castImg.addEventListener("error", () => {
      castImg.setAttribute("src", base64Cast);
    });

    castName.addEventListener("click", () => {
      location.hash = `#categoryByAct=${act.id}-${act.name}`;
    });

    container.appendChild(castName);
    container.appendChild(castImg);
  });
}
