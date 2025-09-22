import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { CLICommand } from './state.js';
import { commandMapForward, commandMapBack } from './command_map.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';
import { commandInspect } from './command_inspect.js';
import { commandPokedex } from './command_pokedex.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    map: {
      name: 'map',
      description: 'Shows 20 locations on the map, moving forward',
      callback: commandMapForward,
    },
    mapb: {
      name: 'mapb',
      description: 'Shows the 20 previous locations on the map',
      callback: commandMapBack,
    },
    explore: {
      name: 'explore',
      description: 'Shows the pokemon in a given location',
      callback: commandExplore,
    },
    catch: {
      name: 'catch',
      description:
        'Attempt to catch the given pokemon. Success varies from pokemon to pokemon based on capture rate.',
      callback: commandCatch,
    },
    inspect: {
      name: 'inspect',
      description: 'Show pokedex data for caught pokemon',
      callback: commandInspect,
    },
    pokedex: {
      name: 'pokedex',
      description: 'Show all of the caught pokemon in your pokedex',
      callback: commandPokedex,
    },
    // can add more commands here
  };
}
