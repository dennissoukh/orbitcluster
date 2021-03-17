const Schedule = require('../packages/Console/Scheduling/Schedule');

class Kernel {
    /**
     * The commands provided by your application.
     */
    commands = [
        require('./commands/DownloadSatcat'),
    ];

    /**
     * Define the application's command schedule.
     */
    schedule = () => {
        Schedule.command('download:satcat').everyFifteenMinutes();
    };

    /**
     * Register the commands for the application.
     */
    // commands = () => {
    //     const normalized = require('path').join(__dirname, 'commands');

    //     require('fs').readdirSync(normalized).forEach((file) => {
    //         require(`./commands/${file}`);
    //     });
    // };
}

module.exports = new Kernel();
