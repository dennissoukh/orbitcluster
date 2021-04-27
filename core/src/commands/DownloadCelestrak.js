const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { convertToInt } = require('../helpers/Number');
const { ParseClassfd, CelesTrak } = require('../build/SpaceData');

class CelesTrakDownloader extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:celestrak';

    /**
     * The console command description.
     */
    description = 'Download and update Celestrak supplemental TLEs';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = performance.now();

        const satellites = [];
        const supplementalElementSets = [
            'starlink',
            'planet',
            'oneweb',
            'gps',
            'glonass',
            'meteosar',
            'intelsat',
            'ses',
            'telesat',
            'orbcomm',
            'iss',
            'cpf',
        ];

        const data = new CelesTrak();

        for (let i = 0; i < supplementalElementSets.length; i += 1) {
            const element = supplementalElementSets[i];

            console.log(`${Date.now()}> Downloading ${element}`);
            const results = await data.get({ set: element, type: 'supplementalElementSets' });
            const parsed = await ParseClassfd(results);

            parsed.forEach((sat) => {
                satellites.push(sat);
            });
        }

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('tle-data');

            // Save tle-data into the database
            for (let i = 0; i < satellites.length; i += 1) {
                const element = satellites[i];
                const norad = convertToInt(element.tle_line2.slice(2, 7));

                await collection.updateOne({ source: 'CelesTrak', norad_cat_id: norad }, {
                    $set: {
                        norad_cat_id: norad,
                        tle_line0: element.tle_line0,
                        tle_line1: element.tle_line1,
                        tle_line2: element.tle_line2,
                        source: 'CelesTrak',
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
        const rowLength = satellites.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = CelesTrakDownloader;
