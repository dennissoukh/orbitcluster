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
        const document = await collection.findOne({ norad_cat_id: Number.parseInt(request.query.id) });

        if (!document) {
            reply.statusCode = 404;
            reply.send({ error: 'Satellite does not exist' });
        }

        reply.send(document);
    });

    done();
};

module.exports = routes;
