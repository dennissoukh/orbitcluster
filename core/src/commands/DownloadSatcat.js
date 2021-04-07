const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');

class DownloadSatcat extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:Satcat';

    /**
     * The console command description.
     */
    description = 'Download and update "launch-sites" from Space-Track';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = performance.now();

        console.log(`${Date.now()}> Executing download`);

        // Query Space-Track API
        const spaceTrack = new SpaceTrack();
        const launchSites = await spaceTrack.get({
            class: 'satcat',
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('satcat');

            // Save each launchsite into the database
            for (let i = 0; i < launchSites.data.length; i += 1) {
                const site = launchSites.data[i];

                await collection.insertOne({
                    intldes: site.INTLDES,
                    norad_cat_id: Number.parseInt(site.NORAD_CAT_ID),
                    object_type: site.OBJECT_TYPE,
                    satname: site.SATNAME,
                    country: site.COUNTRY,
                    launch: new Date(site.LAUNCH),
                    site: site.SITE,
                    decay: new Date(site.DECAY),
                    rcsvalue: Number.parseInt(site.RCSVALUE),
                    rcs_size: site.RCS_SIZE,
                    launch_year: Number.parseInt(site.LAUNCH_YEAR),
                    launch_num: Number.parseInt(site.LAUNCH_NUM),
                    launch_piece: site.LAUNCH_PIECE,
                    current: site.CURRENT,
                    object_name: site.OBJECT_NAME,
                    object_id: site.OBJECT_ID,
                    object_number: Number.parseInt(site.OBJECT_NUMBER),

                });
            }
        } catch (error) {
            throw Error(`${Date.now()}> Could not update documents`);
        }

        // Console debugging messages
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = launchSites.data.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = DownloadSatcat;
