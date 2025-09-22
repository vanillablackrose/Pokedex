import { PokeAPI } from './pokeapi.js';
export async function commandMap(state) {
    //get the current state URL
    //fetch the data
    //update the previous and next url
    //show the data
    let url = state.nextLocationsUrl;
    if (url === '') {
        console.log("you're on the last page");
    }
    else {
        fetchAndShowMap(url, state);
        console.log('got here 2');
    }
}
export async function commandMapB(state) {
    let url = state.previousLocationsUrl;
    if (!url || url == '') {
        console.log("you're on the first page");
    }
    else {
        fetchAndShowMap(url, state);
    }
}
export async function fetchAndShowMap(url, state) {
    let pokeAPI = new PokeAPI();
    let locations = await pokeAPI.fetchLocations(url);
    //there may not be a previous on the first fetch
    if (locations.previous) {
        state.previousLocationsUrl = pokeAPI.cleanURL(locations.previous);
    }
    else {
        state.previousLocationsUrl = state.nextLocationsUrl;
    }
    //if there is no next we are at the end
    if (locations.next) {
        state.nextLocationsUrl = pokeAPI.cleanURL(locations.next);
    }
    else {
        state.nextLocationsUrl = '';
    }
    showMapEntries(locations.results);
    return;
}
export function showMapEntries(locations) {
    Object.entries(locations).forEach(([location, currLocation]) => {
        console.log(`${currLocation.name}`);
    });
    console.log('got here 1');
    return;
}
