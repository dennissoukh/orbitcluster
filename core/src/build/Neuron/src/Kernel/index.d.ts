import { ApplicationContract, CommandContract, CommandConstructorContract, KernelContract, CommandFlag, GlobalFlagHandler } from '../Contracts';
import { ManifestLoader } from '../Manifest/Loader';
export declare class Kernel implements KernelContract {
    application: ApplicationContract;
    /**
     * The state of the kernel
     */
    private state;
    /**
     * The command that started the process
     */
    private entryCommand?;
    /**
     * The default command that will be invoked when no command is
     * defined
     */
    defaultCommand: CommandConstructorContract;
    /**
     * Reference to the mainfest loader
     */
    private manifestLoader;
    /**
     * List of registered commands
     */
    commands: {
        [name: string]: CommandContract;
    };
    aliases: {
        [name: string]: string;
    };
    /**
     * List of registered flags
     */
    flags: {
        [name: string]: CommandFlag<any> & {
            handler: GlobalFlagHandler;
        };
    };
    constructor(application: ApplicationContract);
    /**
     * Exit handler for gracefully exiting the process
     */
    private exitHandler;
    /**
     * The exit code for the process
     */
    exitCode?: number;
    /**
     * The error collected as part of the running commmands or executing flags
     */
    error?: any;
    /**
     * Execute the main command
     */
    private execMain;
    /**
     * Execute global flag handlers
     */
    private executeGlobalFlagsHandlers;
    /**
     * Processes the args and sets values on the command instance
     */
    private processCommandArgsAndFlags;
    /**
     * Register a global flag. These flags can be used with any command
     */
    flag(name: string, handler: GlobalFlagHandler, options: Partial<Exclude<CommandFlag<any>, 'name' | 'propertyName'>>): this;
    /**
     * Handle exiting the process
     */
    private exitProcess;
    /**
     * Find the given command
     */
    find(argv: string[]): Promise<CommandContract | null>;
    /**
     * Makes instance of a given command by processing command line arguments
     */
    handle(argv: string[]): Promise<void>;
    preloadManifest(): Promise<void>;
    useManifest(manifestLoader: ManifestLoader): Promise<this>;
    register(): Promise<this>;
    /**
     * Returns an array of all registered commands
     */
    private getAllCommandsAndAliases;
    /**
     * Returns an arary of command name suggestions for a given name
     */
    getSuggestions(name: string, distance?: number): string[];
    /**
     * Run the default command
     */
    runDefaultCommand(): Promise<any>;
    /**
     * Print the help screen for a given command or all commands/flags
     */
    printHelp(command?: CommandContract): void;
    /**
     * Register an exit handler
     */
    onExit(callback: (kernel: this) => void | Promise<void>): this;
    /**
     * Trigger kernel to exit the process. The call to this method is ignored
     * when command is not same as the 'entrycommand'
     */
    exit(command: CommandContract, error?: any): Promise<void>;
}
