const { method_exists } = require("../../helpers/helpers");

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

    setFastify = (fastify) => {
        this.fastify = fastify;
    }

    execute = () => {
        const method = method_exists(this, 'handle') ? this.handle : undefined;

        return method(this.fastify);
    }
}

module.exports = Command;
