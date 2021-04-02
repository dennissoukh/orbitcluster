const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const SpaceTrack = require('../packages/SpaceTrack');

class DownloadLaunchSites extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:launchsites';

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
        const launchSites = await SpaceTrack.get({
            class: 'launch_site',
        });

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('launch-site');

            // Save each launchsite into the database
            for (let i = 0; i < launchSites.data.length; i += 1) {
                const site = launchSites.data[i];

                await collection.insertOne({
                    site_code: site.SITE_CODE,
                    launch_site: site.LAUNCH_SITE,
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
        const rowLength = launchSites.data.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = DownloadLaunchSites;
