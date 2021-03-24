const Commands = require('../../../commands');
const { printHelp } = require('./Help');

class Kernel {
    /**
     * The Fastify application instance.
     */
    application;

    /**
     * The Neuron kernel state.
     */
    state = 'idle';

    /**
     * The environment in which Neuron is running in.
     */
    environment;

    /**
     * The registered application commands.
     */
    commands = [];

    /**
     * List of registered flags
     */
    flags = [];

    /**
     * Create a newly registered command manifest.
     */
    manifest = new Commands();

    constructor(application, environment) {
        this.application = application;
        this.environment = environment;

        this.registerCommands();
    }

    registerCommands = () => {
        this.manifest.commands.forEach((Command) => {
            const CommandInstance = new Command.default();
            CommandInstance.setApplicationInstance(this.application);
            this.commands.push(CommandInstance);
        });
    }

    findCommand = (commandName) => {
        return this.commands.find((command) => { return command.commandName === commandName; });
    }

    exec = (commandName, args) => {
        const command = this.findCommand(commandName);

        if (!command) {
            throw new Error('The command you specified does not exist');
        }

        return command.exec();
    }

    exitProcess = (error) => {
        if (this.state === 'completed') {
            return;
        }

        this.state = 'completed';

        this.application.close();
    }

    handle = async (argv) => {
        if (this.state !== 'idle') {
            return;
        }

        this.state = 'running';

        try {
            // Branch 1: Run default command and invoke the exit handler
            if (!argv.length) {
                return;
            }

            const [commandName, ...args] = argv;
            await this.exec(commandName, args);
        } catch (error) {
            throw new Error(error);
        }
    }

    printHelp = async () => {
        printHelp(this.commands, this.flags);
    }
}

module.exports = Kernel;
