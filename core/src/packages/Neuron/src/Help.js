const chalk = require("chalk");
const version =  require('../../../../package.json').version;

getCommandsForDisplay = (commands, aliases) => {
    let commandList = [];

    commands.forEach(command => {
        commandList.push({
            displayName: command.commandName,
            description: command.description,
            width: command.commandName.length
        });
    });

    commandList = groupCommands(commandList);

    return commandList;
}

groupCommands = (commands) => {
    return commands.reduce((rv, x) => {
        if (!x.displayName.includes(':')) {
            (rv['default'] = rv['default'] || []).push(x);
            return rv;
        };

        const namespace = x.displayName.split(':')[0];
        (rv[namespace] = rv[namespace] || []).push(x);

        return rv;
    }, {});
}

printHelp = (commands, flags, aliases) => {
    const commandList = getCommandsForDisplay(commands);

    /**
     * Get the length of the longest command.
     */
    const maxWidth = Math.max(...Object.values(commandList).map(command => command[0].width));

    console.log(`Orbitcluster Framework (Neuron) ${chalk.green(version)}`);
    console.log('');

    console.log(chalk.yellow('Usage:'));
    console.log('  command [options] [arguments]');
    console.log('');

    console.log(chalk.yellow('Available commands:'));

    // console.log(commandList)
    commandList.default.forEach((key) => {
        commandList.default.forEach((command) => {
            const displayName = chalk.green(command.displayName);
            const whitespace = ''.padEnd(maxWidth - command.width, ' ');
            const description = chalk.white(command.description);

            console.log(
                `  ${displayName} ${whitespace} ${description}`
            );
        })
    });

    Object.keys(commandList).forEach((key) => {
        if (key === 'default') {
            return;
        }

        console.log(chalk.yellow(key))

        commandList[key].forEach((command) => {
            const displayName = chalk.green(command.displayName);
            const whitespace = ''.padEnd(maxWidth - command.width, ' ');
            const description = chalk.white(command.description);

            console.log(
                `  ${displayName} ${whitespace} ${description}`
            );
        })
    });
}

module.exports = {
    printHelp
}
