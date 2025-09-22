export async function commandHelp(state) {
    console.log('Welcome to the Pokedex!');
    console.log('Usage:');
    console.log('\n');
    let commands = state.commands;
    Object.entries(commands).forEach(([command, currCommand]) => {
        console.log(`${command}: ${currCommand.description}`);
    });
}
