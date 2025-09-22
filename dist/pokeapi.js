import { Cache } from './pokecache.js';
export class PokeAPI {
    static baseURL = 'https://pokeapi.co/api/v2';
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    closeCache() {
        this.cache.stopReapLoop();
    }
    async fetchLocations(pageURL) {
        let cached = this.cache.get(pageURL);
        if (cached === undefined) {
            try {
                const response = await fetch(`${pageURL}`);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                this.cache.add(pageURL, result);
                return result;
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            return cached;
        }
        throw new Error('Should never get here');
    }
    async fetchLocation(locationName) {
        let cached = this.cache.get(locationName);
        if (cached === undefined) {
            try {
                const response = await fetch(`${locationName}`);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                this.cache.add(locationName, result);
                return result;
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            return cached;
        }
        throw new Error('Should never get here');
    }
    cleanURL(url) {
        return url.replace(PokeAPI.baseURL, '');
    }
}
