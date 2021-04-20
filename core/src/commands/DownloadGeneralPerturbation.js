const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');
const { convertToInt, convertToFloat } = require('../helpers/Number');

class DownloadGeneralPerturbations extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:gp';

    /**
     * The console command description.
     */
    description = 'Download and update General Perturbations (GP) from Space-Track';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = performance.now();

        console.log(`${Date.now()}> Executing download`);

        // Query Space-Track API
        const spaceTrack = new SpaceTrack();
        const gp = await spaceTrack.get({
            class: 'gp',
            predicates: [
                'NORAD_CAT_ID',
                'ORIGINATOR',
                'EPOCH',
                'MEAN_MOTION',
                'ECCENTRICITY',
                'INCLINATION',
                'RA_OF_ASC_NODE',
                'ARG_OF_PERICENTER',
                'MEAN_ANOMALY',
                'EPHEMERIS_TYPE',
                'CLASSIFICATION_TYPE',
                'ELEMENT_SET_NO',
                'REV_AT_EPOCH',
                'BSTAR',
                'MEAN_MOTION_DOT',
                'SEMIMAJOR_AXIS',
                'PERIOD',
                'APOAPSIS',
                'PERIAPSIS',
                'TLE_LINE0',
                'TLE_LINE1',
                'TLE_LINE2',
            ],
            query: [
                { field: 'NORAD_CAT_ID', condition: '%3C100000' },
                { field: 'DECAY_DATE', condition: 'null-val' },
            ],
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = await db.collection('general-perturbation');

            // Save each launchsite into the database
            for (let i = 0; i < gp.data.length; i += 1) {
                const element = gp.data[i];
                const norad = convertToInt(sat.NORAD_CAT_ID);

                await collection.updateOne({ norad_cat_id: norad }, {
                    $set: {
                        norad_cat_id: norad,
                        originator: element.ORIGINATOR,
                        epoch: new Date(element.EPOCH),
                        mean_motion: convertToFloat(element.MEAN_MOTION),
                        eccentricity: convertToFloat(element.ECCENTRICITY),
                        inclination: convertToFloat(element.INCLINATION),
                        ra_of_asc_node: convertToFloat(element.RA_OF_ASC_NODE),
                        arg_of_pericenter: convertToFloat(element.ARG_OF_PERICENTER),
                        mean_anomaly: convertToFloat(element.MEAN_ANOMALY),
                        ephemeris_type: convertToInt(element.EPHEMERIS_TYPE),
                        classification_type: element.CLASSIFICATION_TYPE,
                        element_set_no: convertToInt(element.ELEMENT_SET_NO),
                        rev_at_epoch: convertToInt(element.REV_AT_EPOCH),
                        bstar: convertToFloat(element.BSTAR),
                        mean_motion_dot: convertToFloat(element.MEAN_MOTION_DOT),
                        semimajor_axis: convertToFloat(element.SEMIMAJOR_AXIS),
                        period: convertToFloat(element.PERIOD),
                        apoapsis: convertToFloat(element.APOAPSIS),
                        periapsis: convertToFloat(element.PERIAPSIS),
                        tle_line0: element.TLE_LINE0,
                        tle_line1: element.TLE_LINE1,
                        tle_line2: element.TLE_LINE2,
                    },
                }, { upsert: true });
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

        // Console debugging messages
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = gp.data.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = DownloadGeneralPerturbations;
