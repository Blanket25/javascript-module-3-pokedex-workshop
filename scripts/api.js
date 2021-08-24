async function getAllPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=20";

  const response = await fetch(url);
  const { results } = await response.json();
  return results;
}

async function getOnePokemon(url) {
  const response = await fetch (url);
  const pokemon = await response.json();

  return pokemon;
}

export { getAllPokemon, getOnePokemon };
