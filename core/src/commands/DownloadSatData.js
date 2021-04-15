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
    description = 'Download and update "sat-data" from sat-data.json';

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

                await collection.updateOne(
                    { norad_cat_id: element.norad_cat_id },
                    { $set: element },
                    { upsert: true },
                );
            }
        } catch (error) {
            console.error(
                `${Date.now()}> Could not update documents`,
            );
            console.error(
                `${Date.now()}> ${error}`,
            );
            throw error;
        }

        endPerf(t0, `Finished download, ${satData.length} documents synced`);
    }
}

module.exports = SatDataDownloader;
