const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');
const { convertToInt } = require('../helpers/Number');
const { endPerf, startPerf } = require('../helpers/Perf');

class DownloadBoxscore extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:boxscore';

    /**
     * The console command description.
     */
    description = 'Download and update "boxscore" from Space-Track';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = startPerf('Executing Download');

        // Query Space-Track API
        const spaceTrack = new SpaceTrack();
        const boxscore = await spaceTrack.get({
            class: 'boxscore',
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('box-score');

            // Save each launchsite into the database
            for (let i = 0; i < boxscore.data.length; i += 1) {
                const item = boxscore.data[i];

                await collection.insertOne({
                    country: item.COUNTRY,
                    spadoc_cd: item.SPADOC_CD,
                    orbital_tba: convertToInt(item.ORBITAL_TBA),
                    orbital_payload_count: convertToInt(item.ORBITAL_PAYLOAD_COUNT),
                    orbital_rockect_body_count: convertToInt(item.ORBITAL_ROCKET_BODY_COUNT),
                    orbital_debris_count: convertToInt(item.ORBITAL_DEBRIS_COUNT),
                    orbital_total_count: convertToInt(item.ORBITAL_TOTAL_COUNT),
                    decayed_payload_count: convertToInt(item.DECAYED_PAYLOAD_COUNT),
                    decayed_rockect_body_count: convertToInt(item.DECAYED_ROCKET_BODY_COUNT),
                    decayed_debris_count: convertToInt(item.DECAYED_DEBRIS_COUNT),
                    decayed_total_count: convertToInt(item.DECAYED_TOTAL_COUNT),
                    country_total: convertToInt(item.COUNTRY_TOTAL),
                });
            }
        } catch (error) {
            throw Error(`${Date.now()}> Could not update documents: ${error}`);
        }

        endPerf(t0, `Finished download, ${boxscore.data.length} documents synced`);
    }
}

module.exports = DownloadBoxscore;
