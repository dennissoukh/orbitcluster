import { CommandContract, CommandsGroup } from "../Contracts";
/**
 * Loops over the commands and converts them to an array of sorted groups with
 * nested commands inside them. The grouping is done using the command
 * namespace seperated with `:`. Example: `make:controller`
 */
export declare function sortAndGroupCommands(commands: CommandContract[]): CommandsGroup;
