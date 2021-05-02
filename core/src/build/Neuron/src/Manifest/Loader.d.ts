import { CommandConstructorContract } from '../Contracts';
export declare class ManifestLoader {
    private basePath;
    private files;
    booted: boolean;
    private manifestFiles;
    constructor(basePath: string, files: {
        basePath: string;
        manifestAbsPath: string;
    }[]);
    /**
     * Load the manifest file
     */
    private resolveManifestFile;
    /**
     * Load commands from each manifest file
     */
    private loadCommands;
    /**
     * Load a single command
     */
    private loadCommand;
    /**
     * Load all application commands
     */
    loadApplicationCommands(): Promise<CommandConstructorContract[]>;
    /**
     * Boot the loader
     */
    boot(): Promise<void>;
}
