const routes = async (app) => {
    /**
     * GET: Filter out satellites using search queries
     */
    app.get('/search', {
    }, async (request, reply) => {
        const collection = app.mongo.db.collection('satcat');
        collection.createIndex({ satname: 'text' });
        const satellite = await collection.find(
            { $text: { $search: request.query.name } },
        ).toArray();

        reply.send({ satellite });
    });
};
module.exports = routes;
