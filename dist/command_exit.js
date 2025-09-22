export async function commandExit(state) {
    state.readline.close();
    console.log('Closing the Pokedex... Goodbye!');
    process.exit(0);
}
