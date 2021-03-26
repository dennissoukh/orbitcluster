import { ApplicationContract, CommandContract, CommandConstructorContract, KernelContract } from '../Contracts';
import { HelpCommand } from '../HelpCommand';

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
        } catch (error) {

        }
    }

    /**
     * Run the default command
     */
    public async runDefaultCommand() {
        this.defaultCommand.boot();

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
    public printHelp() {
        console.log('print help');
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
