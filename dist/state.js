import { createInterface } from 'readline';
import { getCommands } from './command.js';
import { PokeAPI } from './pokeapi.js';
export function initState(cacheInterval) {
    let prompt = 'Pokedex > ';
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: prompt,
    });
    let pokeAPI = new PokeAPI(cacheInterval);
    let state = {
        commands: getCommands(),
        readline: rl,
        nextLocationsURL: 'https://pokeapi.co/api/v2/location-area',
        pokeAPI: pokeAPI,
    };
    return state;
}
