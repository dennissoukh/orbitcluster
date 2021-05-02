import { CommandContract } from '../Contracts';
import { BaseCommand } from '../BaseCommand';
export declare class HelpCommand extends BaseCommand implements CommandContract {
    static commandName: string;
    static description: string;
    run(): Promise<void>;
}
