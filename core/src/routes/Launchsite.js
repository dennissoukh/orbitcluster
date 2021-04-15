const { generatePaginationQuery } = require('../helpers/database');

const routes = async (app, opts) => {
    app.post('/launchsites', opts, async (request, reply) => {
    // Get the database collection
        const collection = app.mongo.db.collection('launch-site');

        const req = request.body.nextKey;

        const { paginatedQuery, nextKeyFn } = generatePaginationQuery(
            {},
            ['site_code', 1],
            req || null,
        );

        let nextKey = null;

        const documents = await collection
            .find(paginatedQuery)
            .limit(20)
            .sort({ site_code: 1 }).toArray();

        nextKey = nextKeyFn(documents);

        reply.send({ documents, nextKey });
    });
};

module.exports = routes;
