"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestLoader = void 0;
const path_1 = require("path");
const Cosmic_1 = require("../../../Cosmic");
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
    resolveManifestFile(modulePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const manifest = yield require(modulePath);
                const commands = manifest.commands;
                return { basePath: modulePath, commands };
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Load commands from each manifest file
     */
    loadCommands(manifestFile) {
        return __awaiter(this, void 0, void 0, function* () {
            let commands = manifestFile.commands;
            let manifestCommands = [];
            for (const command of commands) {
                manifestCommands.push(yield this.loadCommand(command));
            }
            return manifestCommands;
        });
    }
    /**
     * Load a single command
     */
    loadCommand(commandPath) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Load all application commands
     */
    loadApplicationCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            this.manifestFiles = yield Promise.all(this.files.map((file) => this.resolveManifestFile(file.manifestAbsPath)));
            const commands = [];
            /**
             * Load and process commands in each manifest file
             */
            for (const file of this.manifestFiles) {
                /**
                 * Push the commands of a specific manifest into the main commands definition
                 */
                for (const command of yield this.loadCommands(file)) {
                    commands.push(command);
                }
            }
            return commands;
        });
    }
    /**
     * Boot the loader
     */
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.booted) {
                return;
            }
            this.booted = true;
        });
    }
}
exports.ManifestLoader = ManifestLoader;
