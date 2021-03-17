class Builder {
    /**
     * The Fastify application instance.
     */
    fastify;

    /**
     * The registered application commands & scheduler.
     */
    commands;

    /**
     * Create the Orbitcluster console application.
     */
    constructor(fastify, commands) {
        this.fastify = fastify;
        this.commands = commands;
        this.bindToSchedule();
    }

    /**
     * Bind scheduled commands to the scheduler.
     */
    bindToSchedule = () => {
        this.commands.schedule();
    }
}

module.exports = Builder;
