import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMapForward, commandMapBack } from './command_map.js';
export function getCommands() {
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
        // can add more commands here
    };
}
