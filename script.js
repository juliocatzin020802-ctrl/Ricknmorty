// ===== Configuración =====
const API_URL = "https://rickandmortyapi.com/api/character";
const FAV_KEY = "rm_favoritos";

// ===== Estado =====
let currentPage = 1;
let totalPages = 1;
let favorites = loadFavorites();

// ===== Elementos del DOM =====
const searchInput = document.getElementById("search");
const statusSelect = document.getElementById("filter-status");
const genderSelect = document.getElementById("filter-gender");
const speciesSelect = document.getElementById("filter-species");
const clearBtn = document.getElementById("btn-clear");
const resultsEl = document.getElementById("results");
const messageEl = document.getElementById("message");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageInfo = document.getElementById("page-info");
const favoritesEl = document.getElementById("favorites");
const favMessageEl = document.getElementById("fav-message");
const favCountEl = document.getElementById("fav-count");

// ===== Traducciones para mostrar =====
const STATUS_ES = { Alive: "Vivo", Dead: "Muerto", unknown: "Desconocido" };
const GENDER_ES = {
  Female: "Femenino",
  Male: "Masculino",
  Genderless: "Sin género",
  unknown: "Desconocido",
};

// ===== localStorage =====
function loadFavorites() {
  try {
    const data = localStorage.getItem(FAV_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  } catch (error) {
    showMessage("No se pudieron guardar los favoritos en este navegador.", true);
  }
}

function isFavorite(id) {
  return favorites.some((c) => c.id === id);
}

function toggleFavorite(character) {
  if (isFavorite(character.id)) {
    favorites = favorites.filter((c) => c.id !== character.id);
  } else {
    favorites.push({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      image: character.image,
      origin: character.origin,
      location: character.location,
    });
  }
  saveFavorites();
  renderFavorites();
  // Actualiza el texto de los botones de la lista principal
  document.querySelectorAll("#results .btn-fav").forEach((btn) => {
    const id = Number(btn.dataset.id);
    updateFavButton(btn, isFavorite(id));
  });
}

// ===== Mensajes =====
function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.classList.toggle("error", isError);
}

// ===== Construcción de tarjetas =====
function updateFavButton(btn, fav) {
  btn.textContent = fav ? "Quitar de favoritos" : "Agregar a favoritos";
  btn.classList.toggle("is-fav", fav);
}

function createCard(character) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.src = character.image;
  img.alt = "Imagen de " + character.name;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.textContent = character.name;

  const status = document.createElement("span");
  const statusKey = character.status.toLowerCase();
  status.className = "status " + statusKey;
  status.textContent = STATUS_ES[character.status] || character.status;

  const desc = document.createElement("p");
  const gender = GENDER_ES[character.gender] || character.gender;
  desc.textContent =
    character.species + " · " + gender + " · Origen: " + character.origin.name;

  const loc = document.createElement("p");
  loc.textContent = "Última ubicación: " + character.location.name;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-fav";
  btn.dataset.id = character.id;
  updateFavButton(btn, isFavorite(character.id));
  btn.addEventListener("click", () => toggleFavorite(character));

  body.append(title, status, desc, loc, btn);
  card.append(img, body);
  return card;
}

function renderCharacters(characters) {
  resultsEl.replaceChildren();
  characters.forEach((c) => resultsEl.appendChild(createCard(c)));
}

function renderFavorites() {
  favoritesEl.replaceChildren();
  favCountEl.textContent = favorites.length;
  if (favorites.length === 0) {
    favMessageEl.textContent = "Aún no tienes favoritos. Agrega personajes con el botón de cada tarjeta.";
    return;
  }
  favMessageEl.textContent = "";
  favorites.forEach((c) => favoritesEl.appendChild(createCard(c)));
}

// ===== Consulta a la API con fetch() =====
async function fetchCharacters() {
  const params = new URLSearchParams();
  params.set("page", currentPage);

  const name = searchInput.value.trim();
  if (name) params.set("name", name);
  if (statusSelect.value) params.set("status", statusSelect.value);
  if (genderSelect.value) params.set("gender", genderSelect.value);
  if (speciesSelect.value) params.set("species", speciesSelect.value);

  showMessage("Cargando personajes...");
  resultsEl.replaceChildren();
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    const response = await fetch(API_URL + "?" + params.toString());

    // La API responde 404 cuando no hay coincidencias
    if (response.status === 404) {
      totalPages = 1;
      pageInfo.textContent = "Página 1";
      showMessage("No se encontraron personajes con esa búsqueda o filtros.");
      return;
    }

    if (!response.ok) {
      throw new Error("Error HTTP " + response.status);
    }

    const data = await response.json();
    totalPages = data.info.pages;
    renderCharacters(data.results);
    showMessage("Mostrando " + data.results.length + " de " + data.info.count + " personajes.");
    pageInfo.textContent = "Página " + currentPage + " de " + totalPages;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
  } catch (error) {
    console.error(error);
    showMessage("No se pudo conectar con la API. Revisa tu conexión e inténtalo de nuevo.", true);
  }
}

// ===== Eventos =====
function resetAndSearch() {
  currentPage = 1;
  fetchCharacters();
}

let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(resetAndSearch, 400);
});

[statusSelect, genderSelect, speciesSelect].forEach((el) =>
  el.addEventListener("change", resetAndSearch)
);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  statusSelect.value = "";
  genderSelect.value = "";
  speciesSelect.value = "";
  resetAndSearch();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters();
  }
});

// ===== Inicio =====
renderFavorites();
fetchCharacters();
