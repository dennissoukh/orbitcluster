const { BaseCommand } = require('../build/Neuron');
const { SpaceTrack } = require('../build/SpaceData');
const { endPerf, startPerf } = require('../helpers/Perf');

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
        const t0 = startPerf('Extracting File');

        // Query Space-Track API
        const spaceTrack = new SpaceTrack();
        const launchSites = await spaceTrack.get({
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
            throw Error(`${Date.now()}> Could not update documents`);
        }

        // Console debugging messages
        endPerf(t0, `Finished download, ${launchSites.data.length} documents synced`);
    }
}

module.exports = DownloadLaunchSites;