import { FastifyInstance } from 'fastify';
/**
 * Expose the API to execute Neuron commands
 */
export declare class Neuron {
    private fastify;
    private appRoot;
    constructor(fastify: FastifyInstance, appRoot: string);
    /**
     * Handle the provided Neuron command
     */
    handle(argv: string[]): Promise<void>;
}
