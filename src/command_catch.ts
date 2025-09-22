import { State } from './state.js';
import { Pokemon } from './pokeapi.js';

export async function commandCatch(state: State, ...args: string[]) {
  let pokemonName = args[0];

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  let pokeAPI = state.pokeAPI;

  let pokemon = await pokeAPI.fetchPokemon(pokemonName);

  let catchRate = pokemon.base_experience;

  let catchAttempt = Math.floor(Math.random() * 100) + 1;

  if (catchAttempt > catchRate) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = pokemon;
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}
