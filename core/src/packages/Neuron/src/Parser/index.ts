import getopts from 'getopts';
import { CommandArg, CommandContract, CommandFlag, GlobalFlagHandler } from '../Contracts';

export class Parser {
    constructor(
        private registeredFlags: {
            [name: string]: CommandFlag<any> & { handler: GlobalFlagHandler }
        }
    ) {}

    /**
     * Processes Neuron command flag to set the options for `getopts`
     */
    private preProcessFlag(flag: CommandFlag<any>, options: getopts.Options) {
        /**
         * Register alias (when exists)
         */
        if (flag.alias) {
            options.alias![flag.alias] = flag.name;
        }

        /**
         * Register flag as boolean when `flag.type === 'boolean'`
         */
        if (flag.type === 'boolean') {
            options.boolean!.push(flag.name);
        }

        /**
         * Register flag as string when `flag.type === 'string' | 'array'`
         */
        if (['string', 'array'].indexOf(flag.type) > -1) {
            options.string!.push(flag.name);
        }

        /**
         * Set default value when defined on the flag
         */
        if (flag.default !== undefined) {
            options.default![flag.name] = flag.default;
        }
    }

    public castFlag(flag: CommandFlag<any>, parsed: getopts.ParsedOptions) {
        const value = parsed[flag.name];

        /**
         * Return early when value is undefined or it's type in not an array
         */
        if (['boolean', 'string', 'number'].indexOf(flag.type) > -1) {
            return;
        }

        /**
         * If value is already an array, then return
         */
        if (Array.isArray(value)) {
            return;
        }

        /**
         * Parse string as array seperated by comma
         */
        if (flag.type === 'array') {
            parsed[flag.name] = value ? value.split(','): [];
        }

        /**
         * Parse numbers as an array of numbers seperated by commas
         */
        if (flag.type === 'numArray') {
            parsed[flag.name] = value
                ? typeof value === 'string'
                    ? value.split(',').map((one: any) => Number(one))
                    : [Number(value)]
                : [];
        }
    }

    /**
     * Validate the flag to ensure that it's valid
     */
    public validateFlag(
        flag: CommandFlag<any>,
        parsed: getopts.ParsedOptions
    ) {
        const value = parsed[flag.name];

        if (value === undefined) {
            return;
        }

        if (flag.type === 'string' && typeof value !== 'string') {
            throw Error(`${flag.name}: Invalid Flag Exception`);
        }

        if (flag.type === 'number' && typeof value !== 'number') {
            throw Error(`${flag.name}: Invalid Flag Exception`);
        }

        /**
         * Raise error when value is expected to be array of numbers, but is NaN
         */
        if (
            flag.type === 'numArray' &&
            value.findIndex((one: any) => {
                return typeof one !== 'number' || isNaN(one)
            }) > -1
        ) {
            throw new Error(`${flag.name}: Invalid Flag Exception (Number Integrity)`);
        }
    }

    /**
     * Validate the value to ensure values are defined for required arguments
     */
    public validateArg(
        arg: CommandArg,
        index: number,
        parsed: getopts.ParsedOptions
    ) {
        const value = parsed._[index];

        if (value === undefined && arg.required) {
            throw new Error(`${arg.name}: Missing Argument Exception`);
        }
    }

    /**
     * Parse argv and execute command and global flag handlers
     */
    public parse(argv: string[], command?: CommandContract): getopts.ParsedOptions {
        let options = { alias: {}, boolean: [], default: {}, string: [] };
        const globalFlags = Object.keys(this.registeredFlags).map((name) => this.registeredFlags[name]);

        /**
         * Build options from global flags
         */
        globalFlags.forEach((flag) => this.preProcessFlag(flag, options));

        /**
         * Build options from command flags
         */
        if (command) {
            command.flags.forEach((flag) => this.preProcessFlag(flag, options));
        }

        /**
         * Parsing argv with the previously built options
         */
        const parsed = getopts(argv, options);

        /**
         * Validate global flags (if any)
         */
        globalFlags.forEach((flag) => {
            this.castFlag(flag, parsed);
            this.validateFlag(flag, parsed);
        });

        /**
         * Validate command flags (if command defined)
         */
        if (command) {
            command.flags.forEach((flag) => {
                this.castFlag(flag, parsed);
                this.validateFlag(flag, parsed);
            });
        }

        return parsed;
    }
}

