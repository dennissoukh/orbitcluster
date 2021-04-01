import { ParsedOptions } from 'getopts';
import {
    ApplicationContract,
    CommandArg,
    CommandContract,
    CommandFlag,
    KernelContract
} from "../Contracts";

export abstract class BaseCommand implements CommandContract {
    /**
     * Reference to the exit handler
     */
    protected exitHandler?: () => void | Promise<void>;

    /**
     * Accepts the Fastify application and kernel instance
     */
    constructor(public application: ApplicationContract, public kernel: KernelContract) {}

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
    stayAlive: boolean = false;

    /**
     * Command arguments
     */
    public args: CommandArg[] = [];

    /**
     * Command aliases
     */
    public aliases: string[] = [];

    /**
     * Command flags
     */
    public flags: CommandFlag<any>[];

    /**
     * Parsed options on the command (created via the kernel)
     */
    public parsed?: ParsedOptions;

    /**
     * Error raised by the command
     */
    public error?: any;

    /**
     * Boolean to define whether or not the command has been booted
     */
    public static booted: boolean;

    public async run?(...args: any[]): Promise<any>;
    public async prepare?(...args: any[]): Promise<any>;
    public async completed?(...args: any[]): Promise<any>;

    public static boot() {
        if (this.booted) {
            return;
        }

        this.booted = true;
    }

    public async exec() {
        const hasRun = typeof this.run === 'function';
        let commandResult: any;

        /**
         * Run the command and catch any raised exceptions
         */
        try {
            /**
             * Run prepare method when it exists on the command instance
             */
            if (typeof this.prepare === 'function') {
                await this.application.container.callAsync(this, 'prepare' as any, [this.application.fastify]);
            }

            /**
             * Execute the command handle or run method
             */
            commandResult = await this.application.container.callAsync(
                this,
                hasRun ? 'run' : ('handle' as any),
                [this.application.fastify]
            );
        } catch (error) {
            this.error = error;
        }

        let errorHandled = false;

        /**
         * Run completed method if it exists
         */
        if (typeof this.completed === 'function') {
            errorHandled = await this.application.container.callAsync(this, 'completed' as any, []);
        }

        /**
         * Throw error when the error itself exists and the completed method did not handle it
         */
        if (this.error && !errorHandled) {
            throw this.error;
        }

        return commandResult;
    }

    /**
     * Register an onExit handler
     */
    public onExit(handler: () => void | Promise<void>) {
        this.exitHandler = handler;
        return this;
    }

    /**
     * Trigger an exit
     */
    public async exit() {
        if (typeof this.exitHandler === 'function') {
            await this.exitHandler();
        }

        await this.kernel.exit(this);
    }
}
