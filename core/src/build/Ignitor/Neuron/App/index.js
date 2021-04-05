const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.App = void 0;
const Orbitcluster_1 = require('../../../Orbitcluster');
const Neuron_1 = require('../../../Neuron');
const Cosmic_1 = require('../../../Cosmic');
const chalk_1 = __importDefault(require('chalk'));

class App {
    constructor(fastify, appRoot) {
        this.fastify = fastify;
        this.appRoot = appRoot;
        /**
         * Reference to the application
         */
        this.application = new Orbitcluster_1.Application(this.fastify, 'console', this.appRoot);
        /**
         * Reference to the Neuron kernel
         */
        this.kernel = new Neuron_1.Kernel(this.application);
    }
    getCommandManifest() {
        try {
            const manifestAbsPath = Cosmic_1.resolveFrom(this.application.appRoot, './src/commands/index.js');
            const basePath = this.application.appRoot;
            return [
                { manifestAbsPath, basePath },
            ];
        } catch (error) {
            return [];
        }
    }
    /**
     * Handle application command
     */
    async handle(argv) {
        try {
            /**
             * Manifest files to load
             */
            this.kernel.useManifest(new Neuron_1.ManifestLoader(this.appRoot, this.getCommandManifest()));
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
    addKernelFlags() {
        /**
         * Showing help including core commands
         */
        this.kernel.flag('help', async (value, _, command) => { return this.printHelp(value, command); }, {
            alias: 'h',
            description: 'Display help for the given command',
        });
        this.kernel.flag('version', async (value) => { return this.printVersion(value); }, {
            alias: 'v',
            description: 'Display the application version',
        });
    }
    /**
     * Print commands help
     */
    printHelp(value, command) {
        if (!value) {
            return;
        }
        this.kernel.printHelp(command);
        process.exit(0);
    }
    /**
     * Print version
     */
    printVersion(value) {
        if (!value) {
            return;
        }
        const orbcVersion = require('../../../../../package.json').version;
        const fastifyVersion = require('fastify/package.json').version;
        console.log(`Orbitcluster Framework ${chalk_1.default.green(orbcVersion)}`);
        console.log(`Fastify Framework ${chalk_1.default.green(fastifyVersion)}`);
        process.exit(0);
    }
}
exports.App = App;
