import { LargeNumberLike } from 'crypto';
import { Cache } from './pokecache.js';

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL: string): Promise<ShallowLocations> {
    let cached = this.cache.get<ShallowLocations>(pageURL);
    if (cached === undefined) {
      try {
        const response = await fetch(`${pageURL}`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        this.cache.add(pageURL, result);

        return result;
      } catch (error) {
        console.log(error);
      }
    } else {
      return cached;
    }
    throw new Error('Should never get here');
  }

  async fetchLocation(locationName: string): Promise<Location> {
    let cached = this.cache.get<Location>(locationName);
    if (cached === undefined) {
      try {
        const response = await fetch(
          `${PokeAPI.baseURL}/location-area/${locationName}`
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        this.cache.add(locationName, result);

        return result;
      } catch (error) {
        console.log(error);
      }
    } else {
      return cached;
    }
    throw new Error('Should never get here');
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    let cached = this.cache.get<Pokemon>(pokemonName);
    if (cached === undefined) {
      try {
        const response = await fetch(
          `${PokeAPI.baseURL}/pokemon/${pokemonName}`
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        this.cache.add(pokemonName, result);

        return result;
      } catch (error) {
        console.log(error);
      }
    } else {
      return cached;
    }
    throw new Error('Should never get here');
  }

  cleanURL(url: string) {
    return url.replace(PokeAPI.baseURL, '');
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
  encounter_method_rates: string[];
  game_index: number;
  pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
  pokemon: PokedexDataRecord;
};

export type PokedexDataRecord = {
  name: string;
  url: string;
};

export type Pokemon = {
  base_experience: number;
  id: number;
  name: string;
  location_area_encounters: string;
  order: number;
  height: number;
  weight: number;
  stats: PokemonStatRecord[];
  types: PokemonTypeRecord[];
};

export type PokemonStatRecord = {
  base_stat: number;
  effort: number;
  stat: PokedexDataRecord;
};

export type PokemonTypeRecord = {
  slot: number;
  type: PokedexDataRecord;
};
