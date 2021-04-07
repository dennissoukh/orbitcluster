const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { convertToInt, convertToFloat } = require('../helpers/Number');
const { SpaceOther, ParseClassfd } = require('../build/SpaceData');

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
        const t0 = performance.now();
        console.log(`${Date.now()}> Executing download`);
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
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = parsed.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = DownloadClassfd;
