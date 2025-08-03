// src/genresCountry.mjs
import { api } from "./tmdbApi.mjs";

export function createCategories(categories, container, id, nombre) {
  container.innerHTML = "";

  const isGenre = id === "id";
  const defaultOption = document.createElement("option");
  defaultOption.textContent = isGenre ? "Géneros" : "Origen";
  container.appendChild(defaultOption);

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category[id];
    option.textContent = category[nombre];
    container.appendChild(option);
  });

  container.addEventListener("change", (event) => {
    const value = event.target.value;
    if (!value) {
      container.value = "";
    } else if (!isNaN(value)) {
      location.hash = `#categoryByGenre=${value}`;
    } else {
      location.hash = `#categoryByCountry=${value}`;
    }
  });
}

export async function getCategoriesPreview(media) {
  const apiDropDown = document.getElementById("apiDropdown");
  const apiDropDownPais = document.getElementById("apiDropdownPais");

  try {
    const { data: genero } = await api(`/genre/${media}/list`);
    const { data: country } = await api("/configuration/countries");

    createCategories(genero.genres, apiDropDown, "id", "name");
    createCategories(country, apiDropDownPais, "iso_3166_1", "native_name");
  } catch (error) {
    console.error("Error obteniendo géneros o países:", error);
  }
}
