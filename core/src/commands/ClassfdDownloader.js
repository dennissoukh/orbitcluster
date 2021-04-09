const { BaseCommand } = require('../build/Neuron');
const { convertToInt} = require('../helpers/Number');
const { SpaceOther, ParseClassfd } = require('../build/SpaceData');
const { endPerf, startPerf } = require('../helpers/Perf');

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
        const t0 = startPerf('Extracting File');
        const data = new SpaceOther();
        const classfd = await data.get({ class: 'classfd' });
        const parsed = await ParseClassfd(classfd);

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('tle-data');

            // Save tle-data into the database
            for (let i = 0; i < parsed.length; i += 1) {
                const element = parsed[i];

                await collection.insertOne({
                    norad_cat_id: convertToInt(element.tle_line2.slice(2, 7)),
                    tle_line0: element.tle_line0,
                    tle_line1: element.tle_line1,
                    tle_line2: element.tle_line2,
                    source: 'McCants',
                });
            }
        } catch (error) {
            console.log(
                `${Date.now()}> Could not update documents`,
            );
        }

        // Console debugging messages
        endPerf(t0, `Finished download, ${parsed.length} documents synced`);
    }
}

module.exports = DownloadClassfd;