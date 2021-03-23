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
            if (!argv.length) {
                return;
            }

            this.commandName = argv[0];

            await this.kernel.handle(argv);
        } catch (error) {
            if (!error) {
                process.exit(1);
                return;
            }

            throw new Error(error);
        }
    }
}

module.exports = App;
