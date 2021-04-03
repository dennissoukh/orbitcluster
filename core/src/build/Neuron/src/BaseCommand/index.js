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
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield this.application.container.callAsync(this, 'prepare', [this.application.fastify]);
                }
                /**
                 * Execute the command handle or run method
                 */
                commandResult = yield this.application.container.callAsync(this, hasRun ? 'run' : 'handle', [this.application.fastify]);
            }
            catch (error) {
                this.error = error;
            }
            let errorHandled = false;
            /**
             * Run completed method if it exists
             */
            if (typeof this.completed === 'function') {
                errorHandled = yield this.application.container.callAsync(this, 'completed', []);
            }
            /**
             * Throw error when the error itself exists and the completed method did not handle it
             */
            if (this.error && !errorHandled) {
                throw this.error;
            }
            return commandResult;
        });
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
    exit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.exitHandler === 'function') {
                yield this.exitHandler();
            }
            yield this.kernel.exit(this);
        });
    }
}
exports.BaseCommand = BaseCommand;
