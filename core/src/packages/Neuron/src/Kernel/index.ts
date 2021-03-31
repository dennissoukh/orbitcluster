import { ApplicationContract, CommandContract, CommandConstructorContract, KernelContract } from '../Contracts';
import { HelpCommand } from '../HelpCommand';
import { ManifestLoader } from '../Manifest/Loader';
import { printHelp } from '../utils/help';
import { validateCommand } from '../utils/validateCommand';

export class Kernel implements KernelContract {
    /**
     * The state of the kernel
     */
    private state: 'idle' | 'running' | 'completed' = 'idle';

    /**
     * The command that started the process
     */
    private entryCommand?: CommandContract;

    /**
     * The default command that will be invoked when no command is
     * defined
     */
    public defaultCommand: CommandConstructorContract = HelpCommand;

    /**
     * Reference to the mainfest loader
     */
    private manifestLoader: ManifestLoader;

    /**
     * List of registered commands
     */
    public commands: { [name: string]: CommandContract } = {};
    public aliases: { [name: string]: string } = {};

    constructor(public application: ApplicationContract) {}

    /**
     * Exit handler for gracefully exiting the process
     */
    private exitHandler: (callback: this) => void | Promise<void> = (kernel) => {
        if (kernel.error && typeof kernel.error.handle === 'function') {
            kernel.error.handle(kernel.error);
        }

        process.exit(kernel.exitCode === undefined ? 0 : kernel.exitCode);
    }

    /**
     * The exit code for the process
     */
    public exitCode?: number;

    /**
     * The error collected as part of the running commmands or executing flags
     */
    public error?: any;

    /**
     * Execute the main command
     */
    private async execMain(commandName: string) {
        const command = await this.find([commandName]);

        if (!command) {
            console.log("suggestions: " + this.getSuggestions(commandName));
            throw new Error('Command not found');
        }

        /**
         * Define the entry command
         */
        this.entryCommand = command;

        /**
         * Execute command
         */
        return command.exec();
    }

    /**
     * Handle exiting the process
     */
    private async exitProcess(error?: any) {
        /**
         * Check for state to avoid exiting the process multiple times
         */
        if (this.state === 'completed') {
            return;
        }

        this.state = 'completed';

        /**
         * Assign error to the kernel instance
         */
        if (error) {
            this.error = error;
        }

        /**
         * Figure out exit code for the process
         */
        const exitCode = error ? 1 : 0;
        const commandExitCode = this.entryCommand && this.entryCommand.exitCode;

        this.exitCode = commandExitCode === undefined ? exitCode : commandExitCode;

        try {
            await this.exitHandler(this);
        } catch (exitHandlerError) {
            console.log('Expected the exit handler to exit the process. Instead it raised an exception');
            throw exitHandlerError;
        }
    }

    /**
     * Find the given command
     */
    public async find(argv: string[]): Promise<CommandContract | null> {
        const [commandName] = argv;

        /**
         * Command name from the registered aliases
         */
        const aliasCommandName = this.aliases[commandName];

        const command = this.commands[commandName] || this.commands[aliasCommandName] || null;

        return command;
    }

    /**
     * Makes instance of a given command by processing command line arguments
     */
    public async handle(argv: string[]) {
        if (this.state !== 'idle') {
            return;
        }

        this.state = 'running';

        try {
            /**
             * Branch 1: Run default command and invoke the exit handler
             */
            if (!argv.length) {
                await this.runDefaultCommand();
                await this.exitProcess();
                return;
            }

            /**
             * Branch 2: No command has been mentioned. Execute all the global flags
             * and invoke the exit handler
             */
            const hasMentionedCommand = !argv[0].startsWith('-');
            if (!hasMentionedCommand) {
                // TODO: executeGlobalFlagsHandlers()
                await this.exitProcess();
                return;
            }

            /**
             * Branch 3: Execute the given command as the main command
             */
            const [commandName] = argv;
            await this.execMain(commandName);

            /**
             * Exit the process if there isn't any entry command
             */
            if (!this.entryCommand) {
                await this.exitProcess();
            }

        } catch (error) {
            await this.exitProcess(error);
        }
    }

    public async preloadManifest() {
        if (this.manifestLoader) {
            await this.manifestLoader.boot();
        }
    }

    public async useManifest(manifestLoader: ManifestLoader) {
        this.manifestLoader = manifestLoader;
        return this;
    }

    public async register(): Promise<this> {
        const commands = await this.manifestLoader.loadApplicationCommands();

        for (const command of commands) {
            const commandInstance = await this.application.container.makeAsync(command, [
                this.application,
                this,
            ]);

            validateCommand(commandInstance);

            // Add command to the manifest
            this.commands[commandInstance.commandName] = commandInstance;

            // Register the command aliases
            commandInstance.aliases.forEach(alias => {
                this.aliases[alias] = commandInstance.commandName;
            });
        }

        return this;
    }

    /**
     * Returns an array of all registered commands
     */
    private getAllCommandsAndAliases() {
        let commands = Object.keys(this.commands).map(
            (name) => this.commands[name]
        );

        let aliases = {};

        return {
            commands,
            aliases: Object.assign(aliases, this.aliases)
        };
    }

    /**
     * Returns an arary of command name suggestions for a given name
     */
    public getSuggestions(name: string, distance = 3): string[] {
        const leven = require('leven');
        const { commands, aliases } = this.getAllCommandsAndAliases();

        const suggestions = commands
            .filter(({ commandName }) => leven(name, commandName) <= distance)
            .map(({ commandName }) => commandName);

        return suggestions.concat(
            Object.keys(aliases).filter((alias) => leven(name, alias) <= distance)
        );
    }

    /**
     * Run the default command
     */
    public async runDefaultCommand() {
        const commandInstance = this.application.container.make(this.defaultCommand, [
            this.application,
            this
        ]);

        this.entryCommand = commandInstance;

        /**
         * Execute the command
         */
        return commandInstance.exec();
    }

    /**
     * Print the help screen for a given command or all commands/flags
     */
    public printHelp(command?: CommandConstructorContract) {
        const { commands, aliases } = this.getAllCommandsAndAliases();

        if (command) {
            console.log(`help for: ${command}`);
        } else {
            printHelp(commands, aliases);
        }
    }

    /**
     * Register an exit handler
     */
    public onExit(callback: (kernel: this) => void | Promise<void>): this {
        this.exitHandler = callback;
        return this;
    }

    /**
     * Trigger kernel to exit the process. The call to this method is ignored
     * when command is not same as the 'entrycommand'
     */
    public async exit(command: CommandContract, error?: any) {
        if (command !== this.entryCommand) {
            return;
        }

        await this.exitProcess(error);
    }
}
