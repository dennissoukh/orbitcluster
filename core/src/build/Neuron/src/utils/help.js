"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandNotFoundHelp = exports.printHelpFor = exports.printHelp = void 0;
const chalk_1 = __importDefault(require("chalk"));
const sortAndGroupCommands_1 = require("./sortAndGroupCommands");
/**
 * Returns an array of commands for display
 */
function getCommandsForDisplay(commands, aliases) {
    return commands.map(({ commandName, description }) => {
        const commandAliases = getCommandAliases(commandName, aliases);
        const aliasesString = commandAliases.length ? ` [${commandAliases.join(', ')}]` : '';
        return {
            displayName: `${commandName}${aliasesString}`,
            description,
            width: commandName.length + aliasesString.length
        };
    });
}
/**
 * Returns the aliases for a given command
 */
function getCommandAliases(commandName, aliases) {
    return Object.keys(aliases).reduce((commandAliases, alias) => {
        if (aliases[alias] === commandName) {
            commandAliases.push(alias);
        }
        return commandAliases;
    }, []);
}
function printHelp(commands, aliases, flags) {
    const commandsList = getCommandsForDisplay(commands, aliases);
    const flagsList = getFlagsForDisplay(flags);
    const version = '1.0.0';
    console.log(`Orbitcluster Framework ${chalk_1.default.green(version)}`);
    console.log('');
    console.log(chalk_1.default.yellow('Usage:'));
    console.log('  node neuron [commands] [options]');
    console.log('');
    /**
     * Get width of longest command name
     */
    const maxWidth = Math.max(...commandsList.map(command => command.width));
    if (flagsList.length) {
        console.log(chalk_1.default.yellow('Global options:'));
        flagsList.forEach(({ displayName, description = '' }) => {
            const whiteSpace = ''.padEnd(maxWidth - displayName.length, ' ');
            console.log(`  ${chalk_1.default.green(displayName)} ${whiteSpace} ${description}`);
        });
        console.log('');
    }
    sortAndGroupCommands_1.sortAndGroupCommands(commands).forEach(({ group, commands: groupCommands }) => {
        if (group === 'root') {
            console.log(chalk_1.default.yellow('Available commands:'));
        }
        else {
            console.log(chalk_1.default.yellow(group));
        }
        groupCommands.forEach(({ commandName, description }) => {
            const commandAliases = getCommandAliases(commandName, aliases);
            const aliasesString = commandAliases.length ? ` [${commandAliases.join(', ')}]` : '';
            const displayName = `${commandName}${aliasesString}`;
            const whiteSpace = ''.padEnd(maxWidth - displayName.length, ' ');
            console.log(`  ${chalk_1.default.green(displayName)} ${whiteSpace} ${chalk_1.default.white(description)}`);
        });
    });
}
exports.printHelp = printHelp;
function printHelpFor(command, aliases) {
    if (command.description) {
        console.log(chalk_1.default.yellow('Description:'));
        console.log(`  ${command.description}`);
    }
    console.log('');
    console.log(chalk_1.default.yellow('Usage:'));
    console.log(`  ${command.commandName} ${chalk_1.default.dim(command.args.map(wrapArg).join(' '))}`);
    const flags = getFlagsForDisplay(command.flags);
    const args = getArgsForDisplay(command.args);
    const maxWidth = Math.max.apply(Math, flags.concat(args).map(({ width }) => width));
    const commandAliases = getCommandAliases(command.commandName, aliases);
    if (commandAliases.length) {
        console.log('');
        console.log(chalk_1.default.yellow('Aliases:'));
        console.log(`  ${commandAliases.join(', ')}`);
    }
    if (args.length) {
        console.log('');
        console.log(chalk_1.default.yellow('Arguments:'));
        args.forEach(({ displayName, description = '', width }) => {
            const whiteSpace = ''.padEnd(maxWidth - width, ' ');
            console.log(`  ${chalk_1.default.green(displayName)} ${whiteSpace}  ${description}`);
        });
    }
    if (flags.length) {
        console.log('');
        console.log(chalk_1.default.yellow('Flags:'));
        flags.forEach(({ displayName, displayType, description = '', width }) => {
            const whiteSpace = ''.padEnd(maxWidth - width, ' ');
            console.log(`  ${chalk_1.default.green(displayName)} ${displayType}${whiteSpace}  ${description}`);
        });
    }
}
exports.printHelpFor = printHelpFor;
function wrapArg(arg) {
    const displayName = arg.type === 'spread' ? `...${arg.name}` : arg.name;
    return arg.required ? `${displayName}` : `[${displayName}]`;
}
function getFlagsForDisplay(flags) {
    return flags.map(({ name, type, alias, description }) => {
        const displayName = alias ? `-${alias}, --${name}` : `    --${name}`;
        let displayType = '';
        switch (type) {
            case 'array':
                displayType = 'string[]';
                break;
            case 'numArray':
                displayType = 'number[]';
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
        };
    });
}
function getArgsForDisplay(args) {
    return args.map(({ name, description }) => {
        return {
            displayName: name,
            description: description,
            width: name.length,
        };
    });
}
function commandNotFoundHelp(commandName, suggestions) {
    const errorString = `ERROR: Command "${commandName}" is not defined.`;
    const suggestionString = `Did you mean: ${suggestions.join(', ')}?`;
    console.log('');
    console.log(chalk_1.default.yellow(errorString));
    if (suggestions.length) {
        console.log(suggestionString);
    }
}
exports.commandNotFoundHelp = commandNotFoundHelp;
