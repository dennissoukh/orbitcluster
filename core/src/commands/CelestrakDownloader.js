const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { convertToInt, convertToFloat } = require('../helpers/Number');
const { SpaceOther, ParseClassfd, CelesTrak } = require('../build/SpaceData');

class CelesTrakDownloader extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:celestrak';

    /**
     * The console command description.
     */
    description = 'Download and update "celestrak" from SpaceData';

    /**
     * Execute the console command.
     */
    async run(app) {
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
            'cpf'
        ]

        const data = new CelesTrak();

        for (let i = 0; i < supplementalElementSets.length; i++){
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

                await collection.insertOne({
                    norad_cat_id: convertToInt(element.tle_line2.slice(2, 7)),
                    tle_line0: element.tle_line0,
                    tle_line1: element.tle_line1,
                    tle_line2: element.tle_line2,
                    source: 'CelesTrak',
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
        const rowLength = satellites.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = CelesTrakDownloader;
