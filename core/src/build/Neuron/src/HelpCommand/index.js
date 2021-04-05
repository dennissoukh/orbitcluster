Object.defineProperty(exports, '__esModule', { value: true });
exports.HelpCommand = void 0;
const BaseCommand_1 = require('../BaseCommand');

class HelpCommand extends BaseCommand_1.BaseCommand {
    async run() {
        return this.kernel.printHelp();
    }
}
exports.HelpCommand = HelpCommand;
HelpCommand.commandName = 'help';
HelpCommand.description = 'See help for all the commands';
