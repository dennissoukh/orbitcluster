import { CommandContract, CommandArg } from "../Contracts";

export function validateCommand(
    command: any,
    // commandPath?: string,
): asserts command is CommandContract {
    /**
     * Ensure command has a name property
     */
    if (!command.commandName) {
        throw new Error(
            `Invalid command "${command.commandName}". Make sure to define the static property "commandName"`
        )
    }

    /**
     * Ensure command has args and flags
     */
    if (!Array.isArray(command.args)) {
        throw new Error(`Invalid command "${command.commandName}". Make sure it extends the BaseCommand`);
    }

    let optionalArg: CommandArg;

    /**
     * Validate for optional args and spread args
     */
    command.args.forEach((arg: CommandArg, index: number) => {
        /**
         * Ensure optional arguments comes after required
         * arguments
         */
        if (optionalArg && arg.required) {
            throw new Error(
                `Optional argument "${optionalArg.name}" must be after the required argument "${arg.name}"`
            );
        }

        /**
         * Ensure spread arg is the last arg
         */
        if (arg.type === 'spread' && command.args.length > index + 1) {
            throw new Error(`Spread argument "${arg.name}" must be at last position`);
        }

        if (!arg.required) {
            optionalArg = arg;
        }
    });
}
