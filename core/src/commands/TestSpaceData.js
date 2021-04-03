const { BaseCommand } = require('../build/Neuron');
const { CelesTrak } = require('../build/SpaceData');

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
        const celestrak = new CelesTrak();
        const data = await celestrak.get({
            set: 'starlink',
            format: 'json',
            type: 'GPElementSets',
        });

        console.log(data)
    }
}

module.exports = TestSpaceData;
