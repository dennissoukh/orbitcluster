const { startPerf, endPerf } = require('../helpers/Perf');
const { BaseCommand } = require('../build/Neuron');
const { SpaceOther, ParseClassfd } = require('../build/SpaceData');
const { convertToInt } = require('../helpers/Number');

class DownloadClassfd extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:satclassfd';

    /**
     * The console command description.
     */
    description = 'Download and update "classfd" from SpaceData';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = startPerf('Executing download');

        const spaceOther = new SpaceOther();
        const data = await spaceOther.get({ class: 'classfd' });
        const classfd = await ParseClassfd(data);

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('tle-data');

            // Save each classfd TLE into the database
            for (let i = 0; i < classfd.length; i += 1) {
                const element = classfd[i];
                const norad = convertToInt(element.tle_line2.slice(2, 7));

                await collection.updateOne({ norad_cat_id: norad }, {
                    $set: {
                        norad_cat_id: norad,
                        tle_line0: element.tle_line0,
                        tle_line1: element.tle_line1,
                        tle_line2: element.tle_line2,
                        source: 'McCants',
                    }
                }, { upsert: true });
            }
        } catch (error) {
            throw new Error(`${Date.now()}> Could not update documents`);
        }

        endPerf(t0, `Finished download, ${classfd.length} documents synced`);
    }
}

module.exports = DownloadClassfd;
