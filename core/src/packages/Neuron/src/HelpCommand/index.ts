import { CommandContract } from '../Contracts';
import { BaseCommand } from '../BaseCommand';

export class HelpCommand extends BaseCommand implements CommandContract {
    public static commandName = 'help';
    public static description = 'See help for all the commands';

    public async run() {
        // const app = this.application;

        // this.application.mongo.db.collection('satcat', (err, col) => {
        //     col.find({}).limit(100).toArray((err, result) => {
        //         console.log(err);
        //         console.log(result);
        //     })

        //     throw new Error(err);
        // })
        this.kernel.printHelp();
    }
}
