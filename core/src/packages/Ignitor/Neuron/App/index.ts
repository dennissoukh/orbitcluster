import { FastifyInstance } from 'fastify';
import { Application } from '../../../Orbitcluster';
import { Kernel, ManifestLoader } from '../../../Neuron';
import { resolveFrom } from '../../../Cosmic';

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

    private getCommandManifest() {
        try {
            const manifestAbsPath = resolveFrom(this.application.appRoot, './src/commands/index.js');
            const basePath = this.application.appRoot;
            return [
                { manifestAbsPath, basePath }
            ];
        } catch (error) {
            return [];
        }
    }

    /**
     * Handle application command
     */
    public async handle(argv: string[]) {
        try {
            /**
             * Manifest files to load
             */
            this.kernel.useManifest(
                new ManifestLoader(this.appRoot, this.getCommandManifest())
            );

            /**
             * Preload manifest. This way we can display all the commands
             * that exist in Neuron
             */
            await this.kernel.preloadManifest();

            /**
             * Register application commands
             */
            await this.kernel.register();

            /**
             * Print help when no arguments passed
             */
            if (!argv.length) {
                this.printHelp(true);
                return;
            }

            /**
             * Handle command
             */
            await this.kernel.handle(argv);
        } catch (error) {
            throw error;
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
