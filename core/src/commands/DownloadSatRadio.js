const { BaseCommand } = require('../build/Neuron');
const { SpaceOther, ParseSatlist } = require('../build/SpaceData');
const { convertToInt } = require('../helpers/Number');
const { endPerf, startPerf } = require('../helpers/Perf');
const { groupArrayByKey } = require('../helpers/Array');

class SatRadioDownloader extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:satradio';

    /**
     * The console command description.
     */
    description = 'Download and update "sat-data radio" from SpaceData';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = startPerf('Extracting File');

        const data = new SpaceOther();
        const radio = await data.get({ class: 'radio' });

        // Parse satellite radio data
        let parsed = await ParseSatlist(radio);
        parsed = groupArrayByKey(parsed, 'norad_cat_id');

        try {
            // Get an instance of the application database
            const { db } = app.mongo;

            // Get the database collection
            const collection = db.collection('sat-data');

            // Save sat-data into the database
            for (let i = 0; i < parsed.length; i += 1) {
                const element = parsed[i];
                const norad = convertToInt(Object.keys(element)[0]);

                if (!norad) {
                    continue;
                }

                const document = await collection.findOne({ norad_cat_id: norad });
                if (document) {
                    const query = { norad_cat_id: norad };
                    const radioUpdate = {
                        $set: {
                            radio: element[norad],
                        },
                    };
                    await collection.updateOne(query, radioUpdate);
                } else {
                    const name = element[norad][0].satname;
                    element[norad].forEach((e) => { delete e.norad_cat_id, delete e.satname });

                    await collection.insertOne({
                        norad_cat_id: norad,
                        alternate_name: name,
                        radio: element[norad],
                    });
                }
            }
        } catch (error) {
            console.log(
                `${Date.now()}> Could not update documents`,
            );
            console.log(
                `${Date.now()}> ${error}`,
            );
        }

        // Console debugging messages
        endPerf(t0, `Finished download, ${parsed.length} documents synced`);
    }
}

module.exports = SatRadioDownloader;
