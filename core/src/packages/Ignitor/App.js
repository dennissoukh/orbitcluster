const { Kernel } = require('../../build/Neuron');
const { Ioc } = require('../../build/Ioc');
const path = require('path');

class App {
    commandName;
    application;
    kernel;
    environment

    constructor(application, environment) {
        this.application = application;
        this.environment = environment;
        this.container = new Ioc();
        this.kernel = new Kernel({
            fastify: this.application,
            container: this.container,
            appRoot: path.dirname(require.main.filename)
        });
    }

    async handle(argv) {
        try {
            /**
             * Hold reference to the command name
             */
            this.commandName = [argv];

            /**
             * Handle command
             */
            await this.kernel.handle(argv);

            process.exit(1);
        } catch (error) {
            if (!error) {
                process.exit(1);
            }

            // throw new Error(error);
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
