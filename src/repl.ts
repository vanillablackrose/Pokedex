import { rawListeners } from 'process';
import { stringify } from 'querystring';
import { getCommands } from './command.js';

import { createInterface } from 'node:readline';
import { initState, State } from './state.js';

export function cleanInput(input: string): string[] {
  let strings = input.split(' ');
  let returnStrings = [];

  for (let word of strings) {
    word = word.toLowerCase().trim();
    if (word !== '') {
      returnStrings.push(word);
    }
  }
  return returnStrings;
}

export async function startREPL(state: State) {
  state.readline.prompt();

  state.readline.on('line', async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.readline.prompt();
      return;
    }

    const commandName = words[0];

    const cmd = state.commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      state.readline.prompt();
      return;
    }

    try {
      await cmd.callback(state);
    } catch (e) {
      console.log((e as Error).message);
    }

    state.readline.prompt();
  });
}
