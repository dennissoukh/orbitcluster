const { ObjectId } = require('mongodb');
const {
    constructNotFoundError,
    notFoundMessageContract,
} = require('../helpers/route');

const routes = async (app, opts, done) => {
    app.get('/categories', opts, async (request, reply) => {

        // Get an instance of the application database
        const { db } = app.mongo;

        // Get the database collection
        const collection = db.collection('sat-category');
        const documents = await collection.find().toArray();

        reply.send(documents);
    });

    /**
     * GET a category with a specified category_name
     */
     app.get('/categories/:cat_id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'Category',
                    properties: {
                        satellite: {
                            cat_id: 'string',
                            name: 'string',
                            count: 'description',
                            description: 'string',
                        },
                    },
                },
                404: {
                    type: 'object',
                    properties: {
                        error: notFoundMessageContract,
                    },
                },
            },
        },
    }, async (request, reply) => {
        let cat_id;

        try {
            cat_id = ObjectId(request.params.cat_id);
        } catch (error) {
            constructNotFoundError(reply);
        }

        const collection = app.mongo.db.collection('sat-category');

        let satellite = await collection.findOne(
            { cat_id: cat_id },
        );


});

};
module.exports = routes;
