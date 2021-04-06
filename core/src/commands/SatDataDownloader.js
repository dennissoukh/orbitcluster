const { performance } = require('perf_hooks');
const { BaseCommand } = require('../build/Neuron');
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
                    alternate_name: element.alternate_name ? element.alternate_name : null,
                    un_registry: element.un_registry ? element.un_registry : null,
                    country_operator_owner: element.country_operator_owner ? element.country_operator_owner : null,
                    operator_owner: element.operator_owner ? element.operator_owner : null,
                    users: element.users ? element.users : null,
                    purpose: element.purpose ? element.purpose : null,
                    detailed_purpose: element.detailed_purpose ? element.detailed_purpose : null,
                    orbit_class: element.orbit_class ? element.orbit_class : null,
                    orbit_type: element.orbit_type ? element.orbit_type : null,
                    launch_mass: Number.parseInt(element.launch_mass.replace(/,/g, ''), 10) ? Number.parseInt(element.launch_mass.replace(/,/g, ''), 10) : null,
                    dry_mass: Number.parseInt(element.dry_mass.replace(/,/g, ''), 10) ? Number.parseInt(element.dry_mass.replace(/,/g, ''), 10) : null,
                    power: Number.parseFloat(element.power.replace(/,/g, ''), 10) ? Number.parseFloat(element.power.replace(/,/g, ''), 10) : null,
                    expected_lifetime: Number.parseFloat(element.expected_lifetime.replace(/,/g, ''), 10) ? Number.parseFloat(element.expected_lifetime.replace(/,/g, ''), 10) : null,
                    contractor: element.contractor ? element.contractor : null,
                    contractor_country: element.contractor_country ? element.contractor_country : null,
                    launch_vehicle: element.launch_vehicle ? element.launch_vehicle : null,
                    comments: element.comments ? element.comments : null,
                    norad_cat_id: Number.parseInt(element.norad_number.replace(/,/g, ''), 10) ? Number.parseInt(element.norad_number.replace(/,/g, ''), 10) : null,

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
