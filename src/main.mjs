// Punto de entrada principal de la aplicación
import { initializeNavigation } from './navigation.js';

// Este archivo ya no define lógica compleja.
// Sólo importa e inicia el resto del sistema.

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation(); // Lanzamos el router y render dinámico
  console.log("App inicializada");
});



