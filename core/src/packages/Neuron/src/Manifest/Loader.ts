import { isAbsolute } from 'path';
import { resolveFrom } from '../../../Cosmic';
import { CommandConstructorContract } from '../Contracts';

export class ManifestLoader {
    public booted: boolean = false;

    private manifestFiles: { basePath: string, commands: string[] }[] = [];

    constructor(private basePath: string, private files: { basePath: string; manifestAbsPath: string }[]) { }

    /**
     * Load the manifest file
     */
    private async resolveManifestFile(modulePath: string) {
        try {
            const manifest = await require(modulePath);
            const commands = manifest.commands;

            return { basePath: modulePath, commands }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Load commands from each manifest file
     */
    private async loadCommands(manifestFile: { basePath: string, commands: string[] }) {
        let commands = manifestFile.commands;
        let manifestCommands: any[] = [];

        for (const command of commands) {
            manifestCommands.push(await this.loadCommand(command));
        }

        return manifestCommands;
    }

    /**
     * Load a single command
     */
    private async loadCommand(commandPath: string) {
        if (isAbsolute(commandPath)) {
            throw new Error(
                'Absolute path to a command is not allowed when loading the command'
            )
        }

        /**
         * TODO: Make folder location dynamic
         */
        if (commandPath.startsWith('commands/')) {
            commandPath = `./${commandPath}.js`
        }

        const srcPath = `${this.basePath}/src`;

        try {
            const path = resolveFrom(srcPath, commandPath);
            return require(path);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Load all application commands
     */
    public async loadApplicationCommands() {
        this.manifestFiles = await Promise.all(this.files.map((file) => this.resolveManifestFile(file.manifestAbsPath)));

        const commands: CommandConstructorContract[] = [];

        /**
         * Load and process commands in each manifest file
         */
        for (const file of this.manifestFiles) {
            /**
             * Push the commands of a specific manifest into the main commands definition
             */
            for (const command of await this.loadCommands(file)) {
                commands.push(command)
            }
        }

        return commands;
    }

    /**
     * Boot the loader
     */
    public async boot() {
        if (this.booted) {
            return;
        }

        this.booted = true;
    }
}

