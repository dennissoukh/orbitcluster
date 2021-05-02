import { FastifyInstance } from 'fastify';
export declare class App {
    private fastify;
    private appRoot;
    /**
     * Reference to the application
     */
    private application;
    /**
     * Reference to the Neuron kernel
     */
    private kernel;
    constructor(fastify: FastifyInstance, appRoot: string);
    private getCommandManifest;
    /**
     * Handle application command
     */
    handle(argv: string[]): Promise<void>;
    /**
     * Add kernel flags
     */
    private addKernelFlags;
    /**
     * Print commands help
     */
    private printHelp;
    /**
     * Print version
     */
    private printVersion;
}
