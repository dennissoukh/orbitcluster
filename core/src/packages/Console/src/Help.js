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

    return commandList;
}

printHelp = (commands, flags, aliases) => {
    const commandList = getCommandsForDisplay(commands);

    /**
     * Get the length of the longest command.
     */
    const maxWidth = Math.max(...commandList.map(command => command.width));

    console.log(`Orbitcluster Framework ${chalk.green(version)}`);
    console.log();

    console.log(chalk.yellow('Available commands:'))
    commandList.forEach((command) => {
        const displayName = chalk.green(command.displayName);
        const whitespace = ''.padEnd(maxWidth - command.width, ' ');
        const description = chalk.white(command.description);

        console.log(
            `  ${displayName} ${whitespace} ${description}`
        );
    })
}

module.exports = {
    printHelp
}
