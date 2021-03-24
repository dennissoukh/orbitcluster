const { performance } = require('perf_hooks');
const { BaseCommand } = require('../packages/Neuron');
const SpaceTrack = require('../packages/SpaceTrack');

class DownloadLaunchSites extends BaseCommand {
    commandName = 'download:launchsites';
    description = 'Download and update launch-sites from Space-Track';

    run = async (app) => {
        const t0 = performance.now();

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
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = launchSites.data.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} rows synced @ ${timeTaken}ms`,
        );
    }
}

exports.default = DownloadLaunchSites;
