const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
const { handleEmpty } = require('../helpers/Str');
const { convertToInt, convertToFloat } = require('../helpers/Number');
const ucs = require('../../data/ucs.json');

class SatDataDownloader extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:satdata';

    /**
     * The console command description.
     */
    description = 'Download and update "sat-data" from ucs.json';

    /**
     * Execute the console command.
     */
    async run(app) {
        const t0 = performance.now();
        console.log(`${Date.now()}> Executing download`);

        // Get an instance of the application database
        const { db } = app.mongo;

        try {
            // Get the database collection
            const collection = db.collection('sat-data');

            // Save sat-data into the database
            for (let i = 0; i < ucs.length; i += 1) {
                const element = ucs[i];

                await collection.insertOne({
                    alternate_name: handleEmpty(element.alternate_name),
                    un_registry: handleEmpty(element.un_registry),
                    country_operator_owner: handleEmpty(element.country_operator_owner),
                    operator_owner: handleEmpty(element.operator_owner),
                    users: handleEmpty(element.users),
                    purpose: handleEmpty(element.purpose),
                    detailed_purpose: handleEmpty(element.detailed_purpose),
                    orbit_class: handleEmpty(element.orbit_class),
                    orbit_type: handleEmpty(element.orbit_type),
                    launch_mass: convertToInt(element.launch_mass),
                    dry_mass: convertToInt(element.dry_mass),
                    power: convertToFloat(element.power),
                    expected_lifetime: convertToFloat(element.expected_lifetime),
                    contractor: handleEmpty(element.contractor),
                    contractor_country: handleEmpty(element.contractor_country),
                    launch_vehicle: handleEmpty(element.launch_vehicle),
                    comments: handleEmpty(element.comments),
                    norad_cat_id: convertToInt(element.norad_number),
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
        const rowLength = ucs.length;

        console.log(
            `${Date.now()}> Finished download, ${rowLength} documents synced @ ${timeTaken}ms`,
        );
    }
}

module.exports = SatDataDownloader;
