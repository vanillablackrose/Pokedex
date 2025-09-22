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
        const response = await fetch(`${locationName}`);
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
};
