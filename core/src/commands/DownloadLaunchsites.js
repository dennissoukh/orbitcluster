const { BaseCommand } = require('../build/Neuron');
const performance = require('perf_hooks').performance;
const SpaceTrack = require('../packages/SpaceTrack');

class DownloadLaunchSites extends BaseCommand
{
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
        let t0 = performance.now();

        console.log(`${Date.now()}> Executing download`);

        // Query Space-Track API
        const launchSites = await SpaceTrack.get({
            class: 'launch_site',
        });

        // Save to database
        app.mongo.db.collection('launch-site', (err, col) => {
            launchSites.data.forEach((site) => {
                col.insertOne({
                    site_code: site.SITE_CODE,
                    launch_site: site.LAUNCH_SITE,
                });
            });
        });

        // Debugging values
        let t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = launchSites.data.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`
        );
    }
}

module.exports = DownloadLaunchSites;
