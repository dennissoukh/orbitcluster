const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { SpaceOther, ParseSatlist } = require('../build/SpaceData');

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
        const t0 = performance.now();
        console.log(`${Date.now()}> Executing download`);
        const data = new SpaceOther();
        const radio = await data.get({ class: 'radio' });
        const parsed = await ParseSatlist(radio);

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('sat-data');

            // Save sat-data into the database
            for (let i = 0; i < parsed.length; i += 1) {
                const element = parsed[i];
                const document = await collection.findOne({ norad_cat_id: element.norad_cat_id });
                if (document) {
                    const query = { norad_cat_id: element.norad_cat_id };
                    const radio = {
                        $set: {
                            radio: {
                                uplink: element.uplink,
                                downlink: element.downlink,
                                beacon: element.beacon,
                                mode: element.mode,
                                callsign: element.callsign,
                                type: element.type,
                            },
                        },
                    };
                    await collection.updateOne(query, radio);
                } else if (element.norad_cat_id) {
                    await collection.insertOne({
                        norad_cat_id: Number.parseInt(element.norad_cat_id, 10),
                        alternate_name: element.satname,
                        radio: {
                            uplink: element.uplink,
                            downlink: element.downlink,
                            beacon: element.beacon,
                            mode: element.mode,
                            callsign: element.callsign,
                            type: element.type,
                        },
                    });
                }
            }
        } catch (error) {
            console.log(
                `${Date.now()}> Could not update documents`,
            );
        }

        // Console debugging messages
        const t1 = performance.now();

        const timeTaken = (t1 - t0).toFixed(2);
        const rowLength = parsed.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = SatRadioDownloader;
