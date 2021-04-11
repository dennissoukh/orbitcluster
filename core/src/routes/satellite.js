const mongo = require('mongodb');
const { generatePaginationQuery } = require('../helpers/database');

const routes = async (app, opts, done) => {
    app.get('/satellite', opts, async (request, reply) => {
        if (!request.query.id) {
            reply.statusCode = 500;
            reply.send({ error: 'Satellite ID not specified' });
        }

        // Get an instance of the application database
        const { db } = app.mongo;

        // Get the database collection
        const collection = db.collection('satcat');
        const document = await collection
            .findOne({ norad_cat_id: Number.parseInt(request.query.id, 10) });

        if (!document) {
            reply.statusCode = 404;
            reply.send({ error: 'Satellite does not exist' });
        }

        reply.send(document);
    });

    app.post('/satellites', opts, async (request, reply) => {
        const collection = app.mongo.db.collection('satcat');

        const req = JSON.parse(request.body).nextKey;

        const { paginatedQuery, nextKeyFn } = generatePaginationQuery(
            { object_type: 'PAYLOAD' },
            ['norad_cat_id', 1],
            req || null,
        );

        let nextKey = null;

        const documents = await collection
            .find(paginatedQuery)
            .limit(20)
            .sort({ norad_cat_id: 1 }).toArray();

        nextKey = nextKeyFn(documents);

        reply.send({ documents, nextKey });
    });

    app.post('/satellite', opts, async (request, reply) => {
        const collection = app.mongo.db.collection('satcat');

        let satId = JSON.parse(request.body).id;
        satId = new mongo.ObjectID(satId);

        const document = await collection.findOne({ _id: satId });
        const norad = document.norad_cat_id;

        if (!document) {
            reply.statusCode = 404;
            reply.send({ error: 'Satellite does not exist' });
        }

        const satData = await collection.aggregate([
            {
                $match:
                {
                    norad_cat_id: norad,
                },
            },
            {
                $lookup:
                {
                    from: 'sat-data',
                    localField: 'norad_cat_id',
                    foreignField: 'norad_cat_id',
                    as: 'satdata',
                },
            },
            {
                $lookup:
                {
                    from: 'general-perturbation',
                    localField: 'norad_cat_id',
                    foreignField: 'norad_cat_id',
                    as: 'gp',
                },
            },
            {
                $lookup:
                {
                    from: 'tle-data',
                    localField: 'norad_cat_id',
                    foreignField: 'norad_cat_id',
                    as: 'tledata',
                },
            },
        ]).toArray();

        reply.send(satData[0]);
    });

    done();
};

module.exports = routes;
