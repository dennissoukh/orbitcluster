const mongo = require('mongodb');
const { generatePaginationQuery } = require('../helpers/database');

const routes = async (app, opts, done) => {
    app.post('/satellites', opts, async (request, reply) => {
        const collection = app.mongo.db.collection('satcat');

        const req = JSON.parse(request.body).nextKey;

        const { paginatedQuery, nextKeyFn } = generatePaginationQuery(
            { object_type: 'PAYLOAD' },
            ['norad_cat_id', 1],
            req || null,
        );

        let nextKey = null;

        const documents = await collection.find(paginatedQuery).limit(20).sort({ norad_cat_id: 1 }).toArray();
        nextKey = nextKeyFn(documents);

        reply.send({ documents, nextKey });
    });

    done();
};

module.exports = routes;
