const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');
const { convertToInt } = require('../helpers/Number');
const { handleEmpty } = require('../helpers/Str');

class DownloadSatcat extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:satcat';

    /**
     * The console command description.
     */
    description = 'Download and update satellite catalog from Space-Track';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = performance.now();

        console.log(`${Date.now()}> Executing download`);

        // Query Space-Track API
        const spaceTrack = new SpaceTrack();
        const satellites = await spaceTrack.get({
            class: 'satcat',
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('satcat');

            // Save each launchsite into the database
            for (let i = 0; i < satellites.data.length; i += 1) {
                const sat = satellites.data[i];

                await collection.insertOne({
                    intldes: sat.INTLDES,
                    norad_cat_id: convertToInt(sat.NORAD_CAT_ID),
                    object_type: sat.OBJECT_TYPE,
                    satname: sat.SATNAME,
                    country: handleEmpty(sat.COUNTRY),
                    launch: sat.LAUNCH ? new Date(sat.LAUNCH) : null,
                    site: sat.SITE,
                    decay: sat.DECAY ? new Date(sat.DECAY) : null,
                    rcsvalue: convertToInt(sat.RCSVALUE),
                    rcs_size: sat.RCS_SIZE,
                    launch_year: convertToInt(sat.LAUNCH_YEAR),
                    launch_num: convertToInt(sat.LAUNCH_NUM),
                    launch_piece: sat.LAUNCH_PIECE,
                    current: sat.CURRENT,
                    object_name: sat.OBJECT_NAME,
                    object_id: sat.OBJECT_ID,
                    object_number: convertToInt(sat.OBJECT_NUMBER),
                });
            }
        } catch (error) {
            console.error(
                `${Date.now()}> Could not update documents`,
            );
            console.error(
                `${Date.now()}> ${error}`,
            );
        }

        // Console debugging messages
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = satellites.data.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = DownloadSatcat;
