const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');

class DownloadGeneralPerturbations extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:gp';

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
            class: 'gp',
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = await db.collection('general-perturbation');

            // Save each launchsite into the database
            for (let i = 0; i < launchSites.data.length; i += 1) {
                const site = launchSites.data[i];

                await collection.insertOne({
                    norad_cat_id: Number.parseInt(site.NORAD_CAT_ID,10),
                    originator: site.ORIGINATOR,
                    epoch: new Date(site.EPOCH),
                    mean_motion: Number.parseFloat(site.MEAN_MOTION,10),
                    eccentricity: Number.parseFloat(site.ECCENTRICITY,10),
                    inclination: Number.parseFloat(site.INCLINATION,10),
                    ra_of_asc_node: Number.parseFloat(site.RA_OF_ASC_NODE,10),
                    arg_of_pericenter: Number.parseFloat(site.ARG_OF_PERICENTER,10),
                    mean_anomaly: Number.parseFloat(site.MEAN_ANOMALY,10),
                    ephemeris_type: Number.parseInt(site.EPHEMERIS_TYPE,10),
                    classification_type: site.CLASSIFICATION_TYPE,
                    element_set_no: Number.parseInt(site.ELEMENT_SET_NO,10),
                    rev_at_epoch: Number.parseInt(site.REV_AT_EPOCH,10),
                    bstar: Number.parseFloat(site.BSTAR,10),
                    mean_motion_dot: Number.parseFloat(site.MEAN_MOTION_DOT,10),
                    semimajor_axis: Number.parseFloat(site.SEMIMAJOR_AXIS,10),
                    period: Number.parseFloat(site.PERIOD,10),
                    apoapsis: Number.parseFloat(site.APOAPSIS,10),
                    periapsis: Number.parseFloat(site.PERIAPSIS,10),
                    tle_line0: site.TLE_LINE0,
                    tle_line1: site.TLE_LINE1,
                    tle_line2: site.TLE_LINE2,

                });
            }
        } catch (error) {
            console.log(error);
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

module.exports = DownloadGeneralPerturbations;
