const Kernel = require('../Console').Kernel;

class App {
    commandName;
    application;
    kernel;
    environment

    constructor(application, environment) {
        this.application = application;
        this.environment = environment;
        this.kernel = new Kernel(this.application, this.environment);
    }

    async handle(argv) {
        try {
            /**
             * Print help when no arguments have been passed
             */
            if (!argv.length) {
                this.printHelp(true);
                return;
            }

            /**
             * Hold reference to the command name
             */
            this.commandName = argv[0];

            /**
             * Handle command
             */
            await this.kernel.handle(argv);
        } catch (error) {
            if (!error) {
                process.exit(1);
                return;
            }

            throw new Error(error);
        }
    }

    printHelp = (value, command) => {
        if (!value) {
            return;
        }

        this.kernel.printHelp(command);
        process.exit(0);
    }
}

module.exports = App;
