class Command {
    /**
     * The Fastify application instance.
     */
    fastify;

    /**
     * The name and signature of the console command.
     */
    signature;

    /**
     * The console command name.
     */
    name;

    /**
     * The console command description.
     */
    description;

    /**
     * The console command help text.
     */
    help;
}

module.exports = Command;
