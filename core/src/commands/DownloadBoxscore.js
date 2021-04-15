const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');

class DownloadBoxscore extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:Boxscore';

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
            class: 'boxscore',
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('box-score');

            // Save each launchsite into the database
            for (let i = 0; i < launchSites.data.length; i += 1) {
                const site = launchSites.data[i];

                await collection.insertOne({
                    country: site.COUNTRY,
                    spadoc_cd: site.SPADOC_CD,
                    orbital_tba: Number.parseInt(site.ORBITAL_TBA,10),
                    orbital_payload_count: Number.parseInt(site.ORBITAL_PAYLOAD_COUNT,10),
                    orbital_rockect_body_count: Number.parseInt(site.ORBITAL_ROCKET_BODY_COUNT,10),
                    orbital_debris_count: Number.parseInt(site.ORBITAL_DEBRIS_COUNT,10),
                    orbital_total_count: Number.parseInt(site.ORBITAL_TOTAL_COUNT,10),
                    decayed_payload_count: Number.parseInt(site.DECAYED_PAYLOAD_COUNT,10),
                    decayed_rockect_body_count: Number.parseInt(site.DECAYED_ROCKET_BODY_COUNT,10),
                    decayed_debris_count: Number.parseInt(site.DECAYED_DEBRIS_COUNT,10),
                    decayed_total_count: Number.parseInt(site.DECAYED_TOTAL_COUNT,10),
                    country_total: Number.parseInt(site.COUNTRY_TOTAL,10),
                    

                });
            }
        } catch (error) {
            console.log(error)
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

module.exports = DownloadBoxscore;