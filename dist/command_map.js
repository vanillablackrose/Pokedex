export async function commandMapForward(state) {
    //get the current state URL
    //fetch the data
    //update the previous and next url
    //show the data
    let url = state.nextLocationsURL;
    if (url === '') {
        console.log("you're on the last page");
    }
    else {
        await fetchAndShowMap(url, state);
    }
}
export async function commandMapBack(state) {
    let url = state.prevLocationsURL;
    if (!url || url == '') {
        console.log("you're on the first page");
    }
    else {
        await fetchAndShowMap(url, state);
    }
}
export async function fetchAndShowMap(url, state) {
    let pokeAPI = state.pokeAPI;
    let locations = await pokeAPI.fetchLocations(url);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    showMapEntries(locations.results);
}
export function showMapEntries(locations) {
    Object.entries(locations).forEach(([location, currLocation]) => {
        console.log(`${currLocation.name}`);
    });
}
