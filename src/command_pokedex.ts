import { State } from './state.js';
import { Pokemon } from './pokeapi.js';

export async function commandPokedex(state: State) {
  console.log('Your Pokedex:');
  Object.entries(state.pokedex).forEach(
    ([pokemon, pokemonRecord]) => {
      console.log(`  -${pokemon}`);
    }
  );
}
