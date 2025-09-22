import { State } from './state.js';
import { Location } from './pokeapi.js';

export async function commandExplore(
  state: State,
  ...args: string[]
) {
  let locationName = args[0];

  let pokeAPI = state.pokeAPI;

  let location = await pokeAPI.fetchLocation(locationName);

  showPokemonEncounters(location);
}

function showPokemonEncounters(location: Location) {
  Object.entries(location.pokemon_encounters).forEach(
    ([encounter, pokemonObject]) => {
      console.log(`${pokemonObject.pokemon.name}`);
    }
  );
}
