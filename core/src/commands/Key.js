const chalk = require('chalk');
const { BaseCommand } = require('../build/Neuron');

class Key extends BaseCommand
{
    /**
     * The name and signature of the console command.
     */
    commandName = 'generate:key';

     /**
      * The console command description.
      */
    description = 'Generate a new secret application key';

    /**
     * Execute the console command.
     */
    async run() {
        const secret = Math.random().toString(16).substr(2, 32);
        console.log(chalk.green(secret));

        console.log(
            chalk.gray(
                '> During development, you may want to set the above secret as "APP_KEY" inside the .env file',
            ),
        );
    }
}

module.exports = Key;
