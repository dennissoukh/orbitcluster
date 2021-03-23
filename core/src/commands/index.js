class Commands {
    /**
     * The commands provided by the application.
     */
    commands = [
        require('./GenerateKey'),
    ];

    /**
     * Define the application's command schedule.
     */
    schedule = () => {
        //
    };
}

module.exports = Commands;

