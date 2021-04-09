const { BaseCommand } = require('../build/Neuron');
const satData = require('../../data/sat-data.json');
const { endPerf, startPerf } = require('../helpers/Perf');

class SatDataDownloader extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:satdata';

    /**
     * The console command description.
     */
    description = 'Download and update "sat-data" from ucs.json';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = startPerf('Extracting File');

        try {
            // Get an instance of the application database
            const { db } = app.mongo;

            // Get the database collection
            const collection = db.collection('sat-data');

            // Save sat-data into the database
            for (let i = 0; i < satData.length; i += 1) {
                const element = satData[i];

                await collection.insertOne(element);
            }
        } catch (error) {
            throw new Error(`${Date.now()}> Could not update documents: ${error}`);
        }

        endPerf(t0, `Finished download, ${satData.length} documents synced`);
    }
}

module.exports = SatDataDownloader;
