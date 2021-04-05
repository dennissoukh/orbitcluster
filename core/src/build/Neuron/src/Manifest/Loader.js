Object.defineProperty(exports, '__esModule', { value: true });
exports.ManifestLoader = void 0;
const path_1 = require('path');
const Cosmic_1 = require('../../../Cosmic');

class ManifestLoader {
    constructor(basePath, files) {
        this.basePath = basePath;
        this.files = files;
        this.booted = false;
        this.manifestFiles = [];
    }
    /**
     * Load the manifest file
     */
    async resolveManifestFile(modulePath) {
        try {
            const manifest = await require(modulePath);
            const { commands } = manifest;
            return { basePath: modulePath, commands };
        } catch (error) {
            throw error;
        }
    }
    /**
     * Load commands from each manifest file
     */
    async loadCommands(manifestFile) {
        const { commands } = manifestFile;
        const manifestCommands = [];
        for (const command of commands) {
            manifestCommands.push(await this.loadCommand(command));
        }
        return manifestCommands;
    }
    /**
     * Load a single command
     */
    async loadCommand(commandPath) {
        if (path_1.isAbsolute(commandPath)) {
            throw new Error('Absolute path to a command is not allowed when loading the command');
        }
        /**
         * TODO: Make folder location dynamic
         */
        if (commandPath.startsWith('commands/')) {
            commandPath = `./${commandPath}`;
        }
        const srcPath = `${this.basePath}\\src`;
        try {
            const path = Cosmic_1.resolveFrom(srcPath, commandPath);
            return require(path);
        } catch (error) {
            throw error;
        }
    }
    /**
     * Load all application commands
     */
    async loadApplicationCommands() {
        this.manifestFiles = await Promise.all(this.files.map((file) => { return this.resolveManifestFile(file.manifestAbsPath); }));
        const commands = [];
        /**
         * Load and process commands in each manifest file
         */
        for (const file of this.manifestFiles) {
            /**
             * Push the commands of a specific manifest into the main commands definition
             */
            for (const command of await this.loadCommands(file)) {
                commands.push(command);
            }
        }
        return commands;
    }
    /**
     * Boot the loader
     */
    async boot() {
        if (this.booted) {
            return;
        }
        this.booted = true;
    }
}
exports.ManifestLoader = ManifestLoader;
