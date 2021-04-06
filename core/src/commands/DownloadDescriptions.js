const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const descriptions = require('../../data/descriptions.json');

class SatDataDownloader extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:satdescriptions';

    /**
     * The console command description.
     */
    description = 'Download and update "sat descriptions" from descriptions.json';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = performance.now();
        console.log(`${Date.now()}> Executing download`);

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('sat-data');

            // Save sat-descriptions into the database
            for (let i = 0; i < descriptions.length; i += 1) {
                const element = descriptions[i];
                const norad = Number.parseInt(Object.keys(element)[0], 10);
                const document = await collection.findOne({ norad_cat_id: norad });

                if (document) {
                    const query = { norad_cat_id: norad };
                    const description = {
                        $set: {
                            description: element[Object.keys(element)[0]],
                        },
                    };
                    await collection.updateOne(query, description);
                } else {
                    await collection.insertOne({
                        norad_cat_id: norad,
                        description: element[Object.keys(element)[0]],
                    });
                }
            }
        } catch (error) {
            console.log(
                `${Date.now()}> Could not update documents`,
            );
        }

        // Console debugging messages
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = descriptions.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = SatDataDownloader;
