const { BaseCommand } = require('../build/Neuron');

class Greet extends BaseCommand
{
    /**
     * The name and signature of the console command.
     */
    commandName = 'greet';

    /**
     * The console command description.
     */
    description = 'Greet a user';

    /**
     * The console command aliases.
     */
    aliases = ['gr', 'sayhi'];

    /**
     * Execute the console command.
     */
    async run() {
        console.log('Hello, User!');

        return 0;
    }
}

module.exports = Greet;
