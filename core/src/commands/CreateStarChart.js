const { BaseCommand } = require('../build/Neuron');
const { StarChart } = require('../build/StarChart');

class TestSpaceData extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'process:starchart';

    /**
      * The console command description.
      */
    description = 'Create a star chart';

    /**
     * Execute the console command.
     */
    async run(app) {
        const collection = await app.mongo.db.collection('hyg-star');
        const stars = await collection.find({}).project({
            _id: 0,
            rarad: 1,
            decrad: 1,
            mag: 1,
            proper: 1,
            id: 1,
            hip: 1,
            hd: 1,
            hr: 1
        }).toArray();

        const chartState = {
            lat: 58.55,
            lon: -8.99,
            alt: 60,
            date: new Date(),
        };

        const astroData = {
            stars
        }

        const chart = new StarChart(chartState, astroData);
        chart.create();
    }
}

module.exports = TestSpaceData;
