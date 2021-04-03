const { BaseCommand } = require('../build/Neuron');
const { SpaceOther, ParseMcnames } = require('../build/SpaceData');

class TestSpaceData extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:spacedata';

    /**
      * The console command description.
      */
    description = 'Test SpaceData command';

    /**
     * Execute the console command.
     */
    async run() {
        const spaceother = new SpaceOther();
        const data = await spaceother.get({ class: 'mcnames' });
        const parsed = await ParseMcnames(data);

        console.log(parsed);
    }
}

module.exports = TestSpaceData;
