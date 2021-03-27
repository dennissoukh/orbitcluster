import { FastifyInstance } from 'fastify';
import { Application } from '../../../Orbitcluster';
import { Kernel } from '../../../Neuron';

export class App {
    /**
     * The specified command string
     */
   // private commandName: string;

    /**
     * Reference to the application
     */
    private application = new Application(this.fastify, 'console', this.appRoot);

    /**
     * Reference to the Neuron kernel
     */
    private kernel = new Kernel(this.application);

    constructor(private fastify: FastifyInstance, private appRoot: string) {}

    /**
     * Handle application command
     */
    public async handle(argv: string[]) {
        if (!argv.length) {
            this.printHelp(true);
            return;
        }
    }

    /**
     * Print commands help
     */
    private printHelp(value?: any, command?: any) {
        if (!value) {
            return;
        }

        this.kernel.printHelp(command);
        process.exit(0);
    }
}
