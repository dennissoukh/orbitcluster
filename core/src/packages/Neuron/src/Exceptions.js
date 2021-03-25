const chalk = require("chalk");

class InvalidCommandException {
    commandName;
    suggestions = [];

    invoke = (commandName, suggestions) => {
        const exception = `"${commandName}" is not a registered command.`;
        const length = exception.length + 5;

        console.log('');
        console.log(chalk.bgRed(Array(length).join(' ')));
        console.log(chalk.bgRed(`  ${exception}  `))
        console.log(chalk.bgRed(Array(length).join(' ')));

        return exception;
    }
}

module.exports = {
    InvalidCommandException,
}

