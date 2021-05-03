const { convertToInt } = require('../helpers/Number');
const Predict = require('../packages/Predict/Predict');
const PredictQTH = require('../packages/Predict/src/QTH');
const PredictTLE = require('../packages/Predict/src/TLE');
const PredictTime = require('../packages/Predict/src/Time');
const PredictSat = require('../packages/Predict/src/Sat');

const routes = async (app) => {
    /**
     * GET: Passes for a single satellite
     */
    app.post('/passes/:id', {}, async (request, reply) => {
        // Lat, long, alt
        const collection = app.mongo.db.collection('general-perturbation');
        const norad = convertToInt(request.params.id);
        const satellite = await collection.findOne({ norad_cat_id: norad });

        const { lat, lon, alt } = JSON.parse(request.body);

        // Use the predict library to compute passes
        const predict = new Predict();

        // Create the observer
        const qth = new PredictQTH();
        qth.alt = alt;
        qth.lat = lat;
        qth.lon = lon;

        // Create the predict TLE
        const tle = new PredictTLE(satellite.tle_line0, satellite.tle_line1, satellite.tle_line2);

        // Create the satellite and timestamp
        const sat = new PredictSat(tle);
        const now = PredictTime.getCurrentJulianTimestamp();

        // Find visible passes
        const results = predict.getPasses(sat, qth, now, 10);
        const filtered = predict.filterVisiblePasses(results);

        reply.send({ data: filtered });
    });
};

module.exports = routes;
