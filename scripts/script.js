import { getAllPokemon, getOnePokemon } from "./api.js";

async function createPokemonImage(url) {
  const pokemonImage = document.createElement("img");
  pokemonImage.classList.add("poke-img")
  const pokemonSprite = await getOnePokemon(url);
  pokemonImage.src = pokemonSprite.sprites['other']['official-artwork']['front_default'];
  return pokemonImage;
}

function createPokemonLink(name, url) {
  const pokemonLink = document.createElement("a");
  pokemonLink.classList.add("poke-name")
  pokemonLink.href = url;
  pokemonLink.textContent = name;
  return pokemonLink;
}

async function createPokemonId(url) {
  const pokemonId = document.createElement('p');
  pokemonId.classList.add("poke-id")
  const pokemonInfo = await getOnePokemon(url);
  if(pokemonInfo.id < 10) {
    pokemonId.textContent = `#00${pokemonInfo.id}`
  } else if(pokemonInfo.id < 100) {
    pokemonId.textContent = `#0${pokemonInfo.id}`;
  }
  
  return pokemonId;
}

async function createPokemon(name, url) {
  const newPokemonDiv = document.createElement("div");
  newPokemonDiv.textContent = name;
  newPokemonDiv.classList.add("poke-card")

  fetch(url)
  .then(response => response.json())
  .then(json => {
    newPokemonDiv.textContent += json.id;
    const newImg = document.createElement('img');
    newPokemonDiv.appendChild(newImg)
    newImg.src = json.sprites.front_default;
  })




  // newPokemon.appendChild(await createPokemonId(url))
  // newPokemon.appendChild(await createPokemonImage(url))
  // newPokemon.appendChild(createPokemonLink(name, url))
  return newPokemonDiv;
}

function searchPokemon(event) {
  if (event.code === "Enter") {
    const term = event.target.value;
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
    pokemonContainer.innerHTML = '';
    createPokemon(term, url).then(
      newPokemon => root.appendChild(newPokemon)
    ) 
    }else {
      init();
    //getOnePokemon(term)
    //  .then(pokemon => console.log(pokemon))
  }
}

function createSearchField() {
  const searchField = document.createElement("input");
  searchField.classList.add("search-bar")
  searchField.type = "text";
  searchField.placeholder = "Search";
  searchField.addEventListener("keyup", searchPokemon)
  return searchField;
}

const root = document.getElementById("root");
const pokemonContainer = document.createElement('div');
root.appendChild(createSearchField())
root.appendChild(pokemonContainer);

async function init() {
  
  root.classList.add("grey-background")
  
  pokemonContainer.classList.add("card-container")
  
  const pokemon = await getAllPokemon();

  pokemon.forEach(async ({ name, url }) => {
    pokemonContainer.appendChild(await createPokemon(name, url))
  });
}

init();




   