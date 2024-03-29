"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kernel = void 0;
const HelpCommand_1 = require("../HelpCommand");
const Parser_1 = require("../Parser");
const help_1 = require("../utils/help");
const validateCommand_1 = require("../utils/validateCommand");
class Kernel {
    constructor(application) {
        this.application = application;
        /**
         * The state of the kernel
         */
        this.state = 'idle';
        /**
         * The default command that will be invoked when no command is
         * defined
         */
        this.defaultCommand = HelpCommand_1.HelpCommand;
        /**
         * List of registered commands
         */
        this.commands = {};
        this.aliases = {};
        /**
         * List of registered flags
         */
        this.flags = {};
        /**
         * Exit handler for gracefully exiting the process
         */
        this.exitHandler = (kernel) => {
            if (kernel.error && typeof kernel.error.handle === 'function') {
                kernel.error.handle(kernel.error);
            }
            process.exit(kernel.exitCode === undefined ? 0 : kernel.exitCode);
        };
    }
    /**
     * Execute the main command
     */
    execMain(commandName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = yield this.find([commandName]);
            if (!command) {
                help_1.commandNotFoundHelp(commandName, this.getSuggestions(commandName));
                throw new Error('Command not found exception');
            }
            /**
             * Execute global flags
             */
            this.executeGlobalFlagsHandlers(args, command);
            /**
             * Process the arguments and flags for the command
             */
            yield this.processCommandArgsAndFlags(command, args);
            /**
             * Define the entry command
             */
            this.entryCommand = command;
            /**
             * Execute command
             */
            return command.exec();
        });
    }
    /**
     * Execute global flag handlers
     */
    executeGlobalFlagsHandlers(argv, command) {
        const globalFlags = Object.keys(this.flags);
        const parsedOptions = new Parser_1.Parser(this.flags).parse(argv);
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
    processCommandArgsAndFlags(command, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new Parser_1.Parser(this.flags);
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
                }
                else {
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
                }
                else if (!flagValue && typeof flag.defaultValue === 'function') {
                    command[flag.propertyName] = yield flag.defaultValue(command);
                }
                else if (flagValue || command[flag.propertyName] === undefined) {
                    command[flag.propertyName] = flagValue;
                }
            }
        });
    }
    /**
     * Register a global flag. These flags can be used with any command
     */
    flag(name, handler, options) {
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
    exitProcess(error) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.exitHandler(this);
            }
            catch (exitHandlerError) {
                console.log('Expected the exit handler to exit the process. Instead it raised an exception');
                throw exitHandlerError;
            }
        });
    }
    /**
     * Find the given command
     */
    find(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            const [commandName] = argv;
            /**
             * Command name from the registered aliases
             */
            const aliasCommandName = this.aliases[commandName];
            const command = this.commands[commandName] || this.commands[aliasCommandName] || null;
            return command;
        });
    }
    /**
     * Makes instance of a given command by processing command line arguments
     */
    handle(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state !== 'idle') {
                return;
            }
            this.state = 'running';
            try {
                /**
                 * Branch 1: Run default command and invoke the exit handler
                 */
                if (!argv.length) {
                    yield this.runDefaultCommand();
                    yield this.exitProcess();
                    return;
                }
                /**
                 * Branch 2: No command has been mentioned. Execute all the global flags
                 * and invoke the exit handler
                 */
                const hasMentionedCommand = !argv[0].startsWith('-');
                if (!hasMentionedCommand) {
                    this.executeGlobalFlagsHandlers(argv);
                    yield this.exitProcess();
                    return;
                }
                /**
                 * Branch 3: Execute the given command as the main command
                 */
                const [commandName, ...args] = argv;
                yield this.execMain(commandName, args);
                /**
                 * Exit the process if there isn't any entry command
                 */
                if (!this.entryCommand) {
                    yield this.exitProcess();
                    return;
                }
                /**
                 * Exit the process if the command isn't a stay alive one
                 */
                if (!this.entryCommand.stayAlive) {
                    yield this.exitProcess();
                }
            }
            catch (error) {
                yield this.exitProcess(error);
            }
        });
    }
    preloadManifest() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.manifestLoader) {
                yield this.manifestLoader.boot();
            }
        });
    }
    useManifest(manifestLoader) {
        return __awaiter(this, void 0, void 0, function* () {
            this.manifestLoader = manifestLoader;
            return this;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = yield this.manifestLoader.loadApplicationCommands();
            for (const command of commands) {
                const commandInstance = yield this.application.container.makeAsync(command, [
                    this.application,
                    this,
                ]);
                validateCommand_1.validateCommand(commandInstance);
                // Add command to the manifest
                this.commands[commandInstance.commandName] = commandInstance;
                // Register the command aliases
                commandInstance.aliases.forEach(alias => {
                    this.aliases[alias] = commandInstance.commandName;
                });
            }
            return this;
        });
    }
    /**
     * Returns an array of all registered commands
     */
    getAllCommandsAndAliases() {
        let commands = Object.keys(this.commands).map((name) => this.commands[name]);
        let aliases = {};
        return {
            commands,
            aliases: Object.assign(aliases, this.aliases)
        };
    }
    /**
     * Returns an arary of command name suggestions for a given name
     */
    getSuggestions(name, distance = 3) {
        const leven = require('leven');
        const { commands, aliases } = this.getAllCommandsAndAliases();
        const suggestions = commands
            .filter(({ commandName }) => leven(name, commandName) <= distance)
            .map(({ commandName }) => commandName);
        return suggestions.concat(Object.keys(aliases).filter((alias) => leven(name, alias) <= distance));
    }
    /**
     * Run the default command
     */
    runDefaultCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            const commandInstance = this.application.container.make(this.defaultCommand, [
                this.application,
                this
            ]);
            this.entryCommand = commandInstance;
            /**
             * Execute the command
             */
            return commandInstance.exec();
        });
    }
    /**
     * Print the help screen for a given command or all commands/flags
     */
    printHelp(command) {
        const { commands, aliases } = this.getAllCommandsAndAliases();
        if (command) {
            help_1.printHelpFor(command, aliases);
        }
        else {
            const flags = Object.keys(this.flags).map((name) => this.flags[name]);
            help_1.printHelp(commands, aliases, flags);
        }
    }
    /**
     * Register an exit handler
     */
    onExit(callback) {
        this.exitHandler = callback;
        return this;
    }
    /**
     * Trigger kernel to exit the process. The call to this method is ignored
     * when command is not same as the 'entrycommand'
     */
    exit(command, error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (command !== this.entryCommand) {
                return;
            }
            yield this.exitProcess(error);
        });
    }
}
exports.Kernel = Kernel;
