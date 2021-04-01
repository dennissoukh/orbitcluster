import chalk from "chalk";
import { Aliases, CommandArg, CommandContract, CommandFlag } from "../Contracts";
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
    aliases: Aliases,
    flags: CommandFlag<any>[],
): void {
    const commandsList = getCommandsForDisplay(commands, aliases);
    const flagsList = getFlagsForDisplay(flags);
    const version = '1.0.0';

    console.log(`Orbitcluster Framework ${chalk.green(version)}`);
    console.log('');
    console.log(chalk.yellow('Usage:'))
    console.log('  node neuron [commands] [options]');
    console.log('');

    /**
     * Get width of longest command name
     */
    const maxWidth = Math.max(...commandsList.map(command => command.width));

    if (flagsList.length) {
        console.log(chalk.yellow('Global options:'))

        flagsList.forEach(({ displayName, description = '' }) => {
            const whiteSpace = ''.padEnd(maxWidth - displayName.length, ' ');

            console.log(
                `  ${chalk.green(displayName)} ${whiteSpace} ${description}`
            );
        })

        console.log('');
    }

    sortAndGroupCommands(commands).forEach(({ group, commands: groupCommands }) => {
        if (group === 'root') {
            console.log(chalk.yellow('Available commands:'));
        } else {
            console.log(chalk.yellow(group));
        }

        groupCommands.forEach(({ commandName, description }) => {
            const commandAliases = getCommandAliases(commandName, aliases);
            const aliasesString = commandAliases.length ? ` [${commandAliases.join(', ')}]` : ''
            const displayName = `${commandName}${aliasesString}`;

            const whiteSpace = ''.padEnd(maxWidth - displayName.length, ' ');

            console.log(
                `  ${chalk.green(displayName)} ${whiteSpace} ${chalk.white(description)}`
            );
        })
    })
}

export function printHelpFor(
    command: CommandContract,
    aliases: Aliases
): void {
    if (command.description) {
        console.log(chalk.yellow('Description:'));
        console.log(`  ${command.description}`);
    }

    console.log('');
    console.log(chalk.yellow('Usage:'));
    console.log(
        `  ${command.commandName} ${chalk.dim(command.args.map(wrapArg).join(' '))}`
    );

    const flags = getFlagsForDisplay(command.flags);
    const args = getArgsForDisplay(command.args);

    const maxWidth = Math.max.apply(
        Math,
        flags.concat(args as any).map(({ width }) => width)
    );

    const commandAliases = getCommandAliases(command.commandName, aliases);
    if (commandAliases.length) {
        console.log('');
        console.log(chalk.yellow('Aliases:'));
        console.log(chalk.green(commandAliases.join(', ')));
    }

    if (args.length) {
        console.log('');
        console.log(chalk.yellow('Arguments:'));

        args.forEach(({ displayName, description = '', width }) => {
            const whiteSpace = ''.padEnd(maxWidth - width, ' ');

            console.log(
                `  ${chalk.green(displayName)} ${whiteSpace}  ${description}`
            );
        });
    }

    if (flags.length) {
        console.log('');
        console.log(chalk.yellow('Flags:'));

        flags.forEach(({ displayName, displayType, description = '', width }) => {
            const whiteSpace = ''.padEnd(maxWidth - width, ' ');

            console.log(
                `  ${chalk.green(displayName)} ${displayType}${whiteSpace}  ${description}`
            );
        });
    }
}

function wrapArg(arg: CommandArg): string {
    const displayName = arg.type === 'spread' ? `...${arg.name}` : arg.name;
    return arg.required ? `${displayName}` : `[${displayName}]`;
}

function getFlagsForDisplay(flags: CommandFlag<any>[]) {
    return flags.map(({ name, type, alias, description }) => {
        const displayName = alias ? `-${alias}, --${name}` : `--${name}`;

        let displayType = '';
        switch (type) {
            case 'array':
                displayType = 'string[]'
                break;
            case 'numArray':
                displayType = 'number[]'
                break;
            case 'string':
                displayType = 'string';
                break;
            case 'boolean':
                displayType = 'boolean';
                break;
            case 'number':
                displayType = 'number';
                break;
        }

        return {
            displayName,
            displayType,
            description,
            width: displayName.length + displayType.length,
        }
    });
}

function getArgsForDisplay(args: CommandArg[]) {
    return args.map(({ name, description }) => {
        return {
            displayName: name,
            description: description,
            width: name.length,
        }
    });
}

export function commandNotFoundHelp(
    commandName: string,
    suggestions: string[]
): void {
    const errorString = `ERROR: Command "${commandName}" is not defined.`;
    const suggestionString = `Did you mean: ${suggestions.join(', ')}?`;

    console.log('');
    console.log(chalk.yellow(errorString));

    if (suggestions.length) {
        console.log(suggestionString);
    }
}
