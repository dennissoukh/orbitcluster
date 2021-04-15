const { BaseCommand } = require('../build/Neuron');
const { CelesTrak } = require('../build/SpaceData');
const { ParseCelestrak } = require('../build/SpaceData/src/Other/parsers');
const { convertToInt } = require('../helpers/Number');

class DownloadCelestrakCategory extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:celestrakcategories';

    /**
     * The console command description.
     */
    description = 'Download and update Celestrak categories';

    /**
     * Execute the console command.
     */
    async run(app) {
        const celestrak = new CelesTrak();

        // Get satcat from database
        const { db } = await app.mongo;
        const satcat = db.collection('satcat');

        // Get a list of all the satellite categories
        const categories = await app.mongo.db.collection('sat-category').find().toArray();

        for (let i = 0; i < categories.length; i += 1) {
            const category = categories[i];
            let res;

            console.log(`${Date.now()}> Downloading: ${category.name}`);

            try {
                res = await celestrak.get({ set: category.cat_id, type: 'GPElementSets', format: 'tle' });
            } catch (error) {
                res = await celestrak.get({ set: category.cat_id, type: 'elementSets' });
            }

            res = await ParseCelestrak(res);

            for (let j = 0; j < res.length; j += 1) {
                const element = res[j];

                const norad = convertToInt(element.tle_line2.slice(2, 7));
                const sat = await satcat.findOne({ norad_cat_id: norad });

                if (sat) {
                    const query = { norad_cat_id: norad };
                    const update = {
                        $addToSet: {
                            categories: category.cat_id,
                        },
                    };

                    await satcat.updateOne(query, update);
                }
            }

            await db.collection('sat-category').findOneAndUpdate(
                { cat_id: category.cat_id },
                {
                    $set:
                    { count: res.length },
                },
            );
        }
    }
}

module.exports = DownloadCelestrakCategory;
