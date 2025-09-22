import { createInterface, type Interface } from 'readline';
import { getCommands } from './command.js';
import { PokeAPI, Pokemon } from './pokeapi.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  readline: Interface;
  nextLocationsURL: string;
  prevLocationsURL?: string;
  pokeAPI: PokeAPI;
  pokedex: Record<string, Pokemon>;
};

export function initState(cacheInterval: number) {
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
    pokedex: {},
  };

  return state;
}
