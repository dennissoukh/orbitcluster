Object.defineProperty(exports, '__esModule', { value: true });
exports.Neuron = void 0;
const App_1 = require('./App');
/**
 * Expose the API to execute Neuron commands
 */
class Neuron {
    constructor(fastify, appRoot) {
        this.fastify = fastify;
        this.appRoot = appRoot;
    }
    /**
     * Handle the provided Neuron command
     */
    async handle(argv) {
        /**
         * Proxy over to the Neuron package
         */
        await new App_1.App(this.fastify, this.appRoot).handle(argv);
    }
}
exports.Neuron = Neuron;
