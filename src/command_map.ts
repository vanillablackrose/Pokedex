import { State } from './state.js';
import { PokeAPI, Location } from './pokeapi.js';

export async function commandMapForward(state: State) {
  //get the current state URL
  //fetch the data
  //update the previous and next url
  //show the data

  let url = state.nextLocationsURL;
  if (url === '') {
    console.log("you're on the last page");
  } else {
    await fetchAndShowMap(url, state);
  }
}

export async function commandMapBack(state: State) {
  let url = state.prevLocationsURL;
  if (!url || url == '') {
    console.log("you're on the first page");
  } else {
    await fetchAndShowMap(url, state);
  }
}

export async function fetchAndShowMap(url: string, state: State) {
  let pokeAPI = state.pokeAPI;

  let locations = await pokeAPI.fetchLocations(url);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  showMapEntries(locations.results);
}

export function showMapEntries(locations: Location[]) {
  Object.entries(locations).forEach(([location, currLocation]) => {
    console.log(`${currLocation.name}`);
  });
}
