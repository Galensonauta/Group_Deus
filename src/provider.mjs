// src/provider.mjs
import { api } from "./tmdbApi.mjs";

// Función auxiliar para obtener el país seleccionado desde localStorage
export function idCountry() {
  const item = JSON.parse(localStorage.getItem("id_country"));
  return item && item !== undefined ? item : null;
}

// Guarda el país seleccionado en localStorage
export function idCountrySelect(idC) {
  const addIdC = {};
  if (idC && idC.iso_3166_1) {
    addIdC[idC.iso_3166_1] = idC;
  } else {
    console.error("No se pudo guardar id_country");
    addIdC[idC.iso_3166_1] = undefined;
  }
  localStorage.setItem("id_country", JSON.stringify(addIdC));
}

// Obtener y renderizar países proveedores
export async function getProvider() {
  const dropdown = document.getElementById("apiDropDownPaisProvider");

  try {
    const { data: provider } = await api(`/providers`);
    const forCountry = provider.results;

    // Crea el dropdown con países
    createCategoriesProvider(forCountry, dropdown, "iso_3166_1", "native_name");
  } catch (err) {
    console.error("Error al obtener proveedores:", err);
  }
}

// Renderiza el dropdown y gestiona selección
function createCategoriesProvider(categories, container, id, name) {
  container.innerHTML = "";

  const selected = Object.values(idCountry() || { iso_3166_1: "AR", native_name: "Argentina" });
  const defaultOption = document.createElement("option");
  defaultOption.textContent = selected[0]?.native_name || "Argentina";
  container.appendChild(defaultOption);

  categories.forEach((value) => {
    const option = document.createElement("option");
    option.classList.add("slide");
    option.value = value[id];
    option.textContent = value[name];
    container.appendChild(option);
  });

  container.addEventListener("change", (event) => {
    const selectedId = event.target.value;
    const selectedCountry = categories.find(c => c[id] === selectedId);

    if (selectedCountry && selectedCountry[id]) {
      idCountrySelect(selectedCountry);
    } else {
      console.error("País no válido");
    }
  });
}
