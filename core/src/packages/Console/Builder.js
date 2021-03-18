const Command = require('./Command');

class Builder {
    /**
     * The Fastify application instance.
     */
    fastify;

    /**
     * The registered application kernel.
     */
    kernel;

    /**
     * The registered application commands.
     */
    commands = [];

    /**
     * Create the Orbitcluster console application.
     */
    constructor(fastify, kernel) {
        this.fastify = fastify;
        this.kernel = kernel;

        this.bootstrap(this.kernel.commands);

        this.dispatchSchedule();
    }

    /**
     * Bind scheduled commands to the scheduler.
     */
    dispatchSchedule = () => {
        this.kernel.schedule();
    }

    /**
     * Bootstrap the console application commands.
     */
    bootstrap = (commands) => {
        commands.forEach((command) => {
            this.add(command);
        });
    }

    /**
     * Add a command to the console
     */
    add = (command) => {
        if (command instanceof Command) {
            command.setFastify(this.fastify);
            this.commands.push(command);
        }
    }
}

module.exports = Builder;
