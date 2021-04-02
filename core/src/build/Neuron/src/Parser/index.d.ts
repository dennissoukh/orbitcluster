import getopts from 'getopts';
import { CommandArg, CommandContract, CommandFlag, GlobalFlagHandler } from '../Contracts';
export declare class Parser {
    private registeredFlags;
    constructor(registeredFlags: {
        [name: string]: CommandFlag<any> & {
            handler: GlobalFlagHandler;
        };
    });
    /**
     * Processes Neuron command flag to set the options for `getopts`
     */
    private preProcessFlag;
    castFlag(flag: CommandFlag<any>, parsed: getopts.ParsedOptions): void;
    /**
     * Validate the flag to ensure that it's valid
     */
    validateFlag(flag: CommandFlag<any>, parsed: getopts.ParsedOptions): void;
    /**
     * Validate the value to ensure values are defined for required arguments
     */
    validateArg(arg: CommandArg, index: number, parsed: getopts.ParsedOptions): void;
    /**
     * Parse argv and execute command and global flag handlers
     */
    parse(argv: string[], command?: CommandContract): getopts.ParsedOptions;
}
