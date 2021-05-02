import { Aliases, CommandContract, CommandFlag } from "../Contracts";
export declare function printHelp(commands: CommandContract[], aliases: Aliases, flags: CommandFlag<any>[]): void;
export declare function printHelpFor(command: CommandContract, aliases: Aliases): void;
export declare function commandNotFoundHelp(commandName: string, suggestions: string[]): void;
