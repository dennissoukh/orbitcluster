import { ParsedOptions } from 'getopts';
import { ApplicationContract, CommandArg, CommandContract, CommandFlag, KernelContract } from "../Contracts";
export declare abstract class BaseCommand implements CommandContract {
    application: ApplicationContract;
    kernel: KernelContract;
    /**
     * Reference to the exit handler
     */
    protected exitHandler?: () => void | Promise<void>;
    /**
     * Accepts the Fastify application and kernel instance
     */
    constructor(application: ApplicationContract, kernel: KernelContract);
    /**
     * Name of the command
     */
    commandName: string;
    /**
     * Description of the command
     */
    description: string;
    /**
     * The exit code of the command
     */
    exitCode?: number | undefined;
    /**
     * Define whether the command should stay alive
     */
    stayAlive: boolean;
    /**
     * Command arguments
     */
    args: CommandArg[];
    /**
     * Command aliases
     */
    aliases: string[];
    /**
     * Command flags
     */
    flags: CommandFlag<any>[];
    /**
     * Parsed options on the command (created via the kernel)
     */
    parsed?: ParsedOptions;
    /**
     * Error raised by the command
     */
    error?: any;
    /**
     * Boolean to define whether or not the command has been booted
     */
    static booted: boolean;
    run?(...args: any[]): Promise<any>;
    prepare?(...args: any[]): Promise<any>;
    completed?(...args: any[]): Promise<any>;
    static boot(): void;
    exec(): Promise<any>;
    /**
     * Register an onExit handler
     */
    onExit(handler: () => void | Promise<void>): this;
    /**
     * Trigger an exit
     */
    exit(): Promise<void>;
}
