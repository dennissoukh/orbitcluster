Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseCommand = void 0;
class BaseCommand {
    /**
     * Accepts the Fastify application and kernel instance
     */
    constructor(application, kernel) {
        this.application = application;
        this.kernel = kernel;
        /**
         * Define whether the command should stay alive
         */
        this.stayAlive = false;
        /**
         * Command arguments
         */
        this.args = [];
        /**
         * Command aliases
         */
        this.aliases = [];
        /**
         * Command flags
         */
        this.flags = [];
    }
    static boot() {
        if (this.booted) {
            return;
        }
        this.booted = true;
    }
    async exec() {
        const hasRun = typeof this.run === 'function';
        let commandResult;
        /**
         * Run the command and catch any raised exceptions
         */
        try {
            /**
             * Run prepare method when it exists on the command instance
             */
            if (typeof this.prepare === 'function') {
                await this.application.container.callAsync(this, 'prepare', [this.application.fastify]);
            }
            /**
             * Execute the command handle or run method
             */
            commandResult = await this.application.container.callAsync(this, hasRun ? 'run' : 'handle', [this.application.fastify]);
        } catch (error) {
            this.error = error;
        }
        let errorHandled = false;
        /**
         * Run completed method if it exists
         */
        if (typeof this.completed === 'function') {
            errorHandled = await this.application.container.callAsync(this, 'completed', []);
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
    onExit(handler) {
        this.exitHandler = handler;
        return this;
    }
    /**
     * Trigger an exit
     */
    async exit() {
        if (typeof this.exitHandler === 'function') {
            await this.exitHandler();
        }
        await this.kernel.exit(this);
    }
}
exports.BaseCommand = BaseCommand;
