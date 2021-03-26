import { CommandContract } from '../Contracts';
import { BaseCommand } from '../BaseCommand';

export class HelpCommand extends BaseCommand implements CommandContract {
    public static commandName = 'help';
    public static description = 'See help for all the commands';

    public async run() {
        return this.kernel.printHelp();
    }
}
