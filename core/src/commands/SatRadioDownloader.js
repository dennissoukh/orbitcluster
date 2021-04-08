const { BaseCommand } = require('../build/Neuron');
const { SpaceOther, ParseSatlist } = require('../build/SpaceData');
const { convertToInt } = require('../helpers/Number');
const { endPerf, startPerf } = require('../helpers/Perf');

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
                    const radioUpdate = {
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
                    await collection.updateOne(query, radioUpdate);
                } else if (element.norad_cat_id) {
                    await collection.insertOne({
                        norad_cat_id: convertToInt(element.norad_cat_id),
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
        endPerf(t0, `Finished download, ${parsed.length} documents synced`);
    }
}

module.exports = SatRadioDownloader;
