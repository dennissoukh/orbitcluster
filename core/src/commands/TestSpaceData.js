const { BaseCommand } = require('../build/Neuron');
const { SpaceOther } = require('../build/SpaceData');

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
        const data = await spaceother.get({ class: 'amsat' });

        console.log(data)
    }
}

module.exports = TestSpaceData;
