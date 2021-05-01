const { BaseCommand } = require('../build/Neuron');
const { SpaceOther } = require('../build/SpaceData');
const { convertToInt } = require('../helpers/Number');
const { startPerf, endPerf } = require('../helpers/Perf');
const { ParseAmsat, ParseHamsat, ParseClassfd } = require('../build/SpaceData/src/Other/parsers');

class DownloadElementSets extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:elements';

    /**
     * The console command description.
     */
    description = 'Download and update TLEs from various sources';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = startPerf('Downloading orbital elements');

        const data = new SpaceOther();

        // The data sources to download from
        const amsat = await data.get({ class: 'amsat' });
        const hamsat = await data.get({ class: 'hamsat' });
        const classfd = await data.get({ class: 'classfd' });
        const inttles = await data.get({ class: 'inttles' });

        // Convert data sources to readable array
        const amsatParsed = await ParseAmsat(amsat);
        const hamsatParsed = await ParseHamsat(hamsat);
        const classfdParsed = await ParseClassfd(classfd);
        const inttlesParsed = await ParseClassfd(inttles);

        const res = amsatParsed.concat(
            hamsatParsed,
            classfdParsed,
            inttlesParsed,
        );

        try {
            // Get an instance of the application database
            const { db } = app.mongo;

            // Get the database collection
            const collection = db.collection('tle-data');

            // Save tle-data into the database
            for (let i = 0; i < res.length; i += 1) {
                const element = res[i];
                const norad = convertToInt(element.tle_line2.slice(2, 7));

                if (norad) {
                    await collection.updateOne({ source: element.source, norad_cat_id: norad }, {
                        $set: {
                            norad_cat_id: norad,
                            tle_line0: element.tle_line0,
                            tle_line1: element.tle_line1,
                            tle_line2: element.tle_line2,
                            source: element.source,
                        }
                    }, { upsert: true });
                }
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

        endPerf(t0, `Completed download, ${res.length} documents synced`);
    }
}

module.exports = DownloadElementSets;
