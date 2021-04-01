import { FastifyInstance } from 'fastify';
import { App } from './App';

/**
 * Expose the API to execute Neuron commands
 */
export class Neuron {
    constructor(private fastify: FastifyInstance, private appRoot: string) {}

    /**
     * Handle the provided Neuron command
     */
    public async handle(argv: string[]) {
        /**
         * Proxy over to the Neuron package
         */
        await new App(this.fastify, this.appRoot).handle(argv);
    }
}
