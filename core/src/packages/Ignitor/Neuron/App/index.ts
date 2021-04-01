import { FastifyInstance } from 'fastify';
import { Application } from '../../../Orbitcluster';
import { Kernel, ManifestLoader } from '../../../Neuron';
import { resolveFrom } from '../../../Cosmic';
import chalk from 'chalk';

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
             * Add global kernel flags
             */
            this.addKernelFlags();

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
     * Add kernel flags
     */
    private addKernelFlags() {
        /**
         * Showing help including core commands
         */
        this.kernel.flag('help', async (value, _, command) => this.printHelp(value, command), {
            alias: 'h',
            description: 'Display help for the given command'
        });

        this.kernel.flag('version', async (value) => this.printVersion(value), {
            alias: 'v',
            description: 'Display the application version'
        });
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

    /**
     * Print version
     */
    private printVersion(value?: any) {
        if (!value) {
            return;
        }

        const orbcVersion = require('../../../../../package.json').version;
        const fastifyVersion = require('fastify/package.json').version;

        console.log(`Orbitcluster Framework ${chalk.green(orbcVersion)}`);
        console.log(`Fastify Framework ${chalk.green(fastifyVersion)}`);

        process.exit(0);
    }
}
