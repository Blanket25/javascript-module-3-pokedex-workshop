/*Complete the getOnePokemonSprite function to make sure we return the URL of a sprite for each Pokemon
Complete the init function to make sure we render an image for each sprite returned from the API */

import { getAllPokemon, getOnePokemonSprite } from "./api.js";

async function init() {
  const pokemon = await getAllPokemon();


  pokemon.forEach(async ({ name, url }) => {
    const newPokemon = document.createElement("div");
    const pokemonLink = document.createElement("a");
    pokemonLink.href = url;
    pokemonLink.textContent = name;
    newPokemon.appendChild(pokemonLink);
    root.appendChild(newPokemon);

    const spriteUrl = await getOnePokemonSprite(url);
    const pokeImg = document.createElement("img");
    pokeImg.src = spriteUrl;
    newPokemon.appendChild(pokeImg);
       
    console.log(
      "Here I will be creating an image with the sprite returned by getOnePokemonSprite"
    );
  });
}

init()
