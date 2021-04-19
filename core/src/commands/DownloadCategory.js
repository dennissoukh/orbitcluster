const { BaseCommand } = require('../build/Neuron');
const { startPerf, endPerf } = require('../helpers/Perf');
const categories = require('../../data/sat-categories.json');

class DownloadCategory extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:categories';

    /**
     * The console command description.
     */
    description = 'Download and update satellite categories';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = startPerf('Extracting File');

        try {
            const { db } = app.mongo;
            const collection = db.collection('sat-category');

            for (let i = 0; i < categories.length; i += 1) {
                const element = categories[i];

                await collection.updateOne(
                    { cat_id: element.cat_id },
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

        endPerf(t0, `Finished download, ${categories.length} documents synced`);
    }
}

module.exports = DownloadCategory;
