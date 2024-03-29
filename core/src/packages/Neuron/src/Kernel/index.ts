import { ApplicationContract, CommandContract, CommandConstructorContract, KernelContract, CommandFlag, GlobalFlagHandler } from '../Contracts';
import { HelpCommand } from '../HelpCommand';
import { ManifestLoader } from '../Manifest/Loader';
import { Parser } from '../Parser';
import { commandNotFoundHelp, printHelp, printHelpFor } from '../utils/help';
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

    /**
     * List of registered flags
     */
    public flags: { [name: string]: CommandFlag<any> & { handler: GlobalFlagHandler } } = {};

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
    private async execMain(commandName: string, args: string[]) {
        const command = await this.find([commandName]);

        if (!command) {
            commandNotFoundHelp(commandName, this.getSuggestions(commandName));
            throw new Error('Command not found exception');
        }

        /**
         * Execute global flags
         */
        this.executeGlobalFlagsHandlers(args, command);

        /**
         * Process the arguments and flags for the command
         */
        await this.processCommandArgsAndFlags(command, args);

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
     * Execute global flag handlers
     */
    private executeGlobalFlagsHandlers(argv: string[], command?: CommandContract) {
        const globalFlags = Object.keys(this.flags);
        const parsedOptions = new Parser(this.flags).parse(argv);

        globalFlags.forEach((name) => {
            const value = parsedOptions[name];

            /**
             * Flag was not specified
             */
            if (value === undefined || value === false) {
                return;
            }

            /**
             * Flag was not specified, but `getops` will return an empty array or string
             */
            if ((typeof value === 'string' || Array.isArray(value)) && !value.length) {
                return;
            }

            /**
             * Calling the handler
             */
            this.flags[name].handler(parsedOptions[name], parsedOptions, command);
        });
    }

    /**
     * Processes the args and sets values on the command instance
     */
    private async processCommandArgsAndFlags(command: CommandContract, args: string[]) {
        const parser = new Parser(this.flags);

        /**
         * Parse the command arguments
         */
        const parsedOptions = parser.parse(args, command);

        /**
         * Validate command arguments after the global flags have been executed
         */
        command.args.forEach((arg, index) => {
            parser.validateArg(arg, index, parsedOptions);
        });

        /**
         * Set parsed options on the command instance
         */
        command.parsed = parsedOptions;

        /**
         * Setup command instance argument and flag properties.
         */
        for (let i = 0; i < command.args.length; i++) {
            const arg = command.args[i];

            if (arg.type === 'spread') {
                command[arg.propertyName] = parsedOptions._.slice(i);
                break;
            } else {
                command[arg.propertyName] = parsedOptions._[i];
            }
        }

        /**
         * Set flag value on the command instance
         */
        for (let flag of command.flags) {
            const flagValue = parsedOptions[flag.name];

            if (flag.type === 'boolean') {
                command[flag.propertyName] = flagValue;
            } else if (!flagValue && typeof flag.defaultValue === 'function') {
                command[flag.propertyName] = await flag.defaultValue(command);
            } else if (flagValue || command[flag.propertyName] === undefined) {
                command[flag.propertyName] = flagValue;
            }
        }
    }

    /**
     * Register a global flag. These flags can be used with any command
     */
    public flag(
        name: string,
        handler: GlobalFlagHandler,
        options: Partial<Exclude<CommandFlag<any>, 'name' | 'propertyName' >>
    ): this {
        this.flags[name] = Object.assign({
            name,
            propertyName: name,
            handler,
            type: 'boolean'
        }, options);

        return this;
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
                this.executeGlobalFlagsHandlers(argv);
                await this.exitProcess();
                return;
            }

            /**
             * Branch 3: Execute the given command as the main command
             */
            const [commandName, ...args] = argv;
            await this.execMain(commandName, args);

            /**
             * Exit the process if there isn't any entry command
             */
            if (!this.entryCommand) {
                await this.exitProcess();
                return;
            }

            /**
             * Exit the process if the command isn't a stay alive one
             */
            if (!this.entryCommand.stayAlive) {
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
    public printHelp(command?: CommandContract) {
        const { commands, aliases } = this.getAllCommandsAndAliases();

        if (command) {
            printHelpFor(command, aliases);
        } else {
            const flags = Object.keys(this.flags).map((name) => this.flags[name]);
            printHelp(commands, aliases, flags);
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
