import { State } from './state.js';
import { Pokemon } from './pokeapi.js';

export async function commandInspect(
  state: State,
  ...args: string[]
) {
  let pokemonName = args[0];

  let pokemon = state.pokedex[pokemonName];

  if (!pokemon) {
    console.log('you have not caught that pokemon');
  } else {
    showPokemonData(pokemon);
  }
}

function showPokemonData(pokemon: Pokemon) {
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log('Stats:');
  Object.entries(pokemon.stats).forEach(([stat, statRecord]) => {
    console.log(
      `  -${statRecord.stat.name}: ${statRecord.base_stat}`
    );
  });
  console.log('Types:');
  Object.entries(pokemon.types).forEach(([type, typeRecord]) => {
    console.log(`  -${typeRecord.type.name}`);
  });
}
