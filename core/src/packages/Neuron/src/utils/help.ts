import chalk from "chalk";
import { Aliases, CommandContract } from "../Contracts";
import { sortAndGroupCommands } from "./sortAndGroupCommands";

/**
 * Returns an array of commands for display
 */
function getCommandsForDisplay(commands: CommandContract[], aliases: Aliases) {
    return commands.map(({ commandName, description }) => {
        const commandAliases = getCommandAliases(commandName, aliases);
        const aliasesString = commandAliases.length ? ` [${commandAliases.join(', ')}]` : '';

        return {
            displayName: `${commandName}${aliasesString}`,
            description,
            width: commandName.length + aliasesString.length
        }
    })
}

/**
 * Returns the aliases for a given command
 */
function getCommandAliases(commandName: string, aliases: Aliases) {
    return Object.keys(aliases).reduce<string[]>((commandAliases, alias) => {
        if (aliases[alias] === commandName) {
            commandAliases.push(alias);
        }

        return commandAliases;
    }, [])
}

export function printHelp(
    commands: CommandContract[],
    aliases: Aliases
): void {
    const commandsList = getCommandsForDisplay(commands, aliases);

    /**
     * Get width of longest command name
     */
     const maxWidth = Math.max(...commandsList.map(command => command.width));

    sortAndGroupCommands(commands).forEach(({ group, commands: groupCommands }) => {
        console.log('');

        if (group === 'root') {
            console.log(chalk.yellow('Available Commands'));
        } else {
            console.log(chalk.yellow(group));
        }

        groupCommands.forEach(({ commandName, description }) => {
            const commandAliases = getCommandAliases(commandName, aliases);
            const aliasesString = commandAliases.length ? ` [${commandAliases.join(', ')}]` : ''
            const displayName = `${commandName}${aliasesString}`;

            const whiteSpace = ''.padEnd(maxWidth - displayName.length, ' ');

            console.log(
                `  ${chalk.green(displayName)} ${whiteSpace} ${chalk.dim(description)}`
            );
        })
    })
}

