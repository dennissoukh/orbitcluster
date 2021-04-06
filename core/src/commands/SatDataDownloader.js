const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
require('../helpers/Str');
require('../helpers/Number');
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
                    alternate_name: element.alternate_name.handleEmpty(),
                    un_registry: element.un_registry.handleEmpty(),
                    country_operator_owner: element.country_operator_owner.handleEmpty(),
                    operator_owner: element.operator_owner.handleEmpty(),
                    users: element.users.handleEmpty(),
                    purpose: element.purpose.handleEmpty(),
                    detailed_purpose: element.detailed_purpose.handleEmpty(),
                    orbit_class: element.orbit_class.handleEmpty(),
                    orbit_type: element.orbit_type.handleEmpty(),
                    launch_mass: element.launch_mass.convertToInt(),
                    dry_mass: element.dry_mass.convertToInt(),
                    power: element.power.convertToFloat(),
                    expected_lifetime: element.expected_lifetime.convertToFloat(),
                    contractor: element.contractor.handleEmpty(),
                    contractor_country: element.contractor_country.handleEmpty(),
                    launch_vehicle: element.launch_vehicle.handleEmpty(),
                    comments: element.comments.handleEmpty(),
                    norad_cat_id: element.norad_cat_id.convertToInt(),

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
