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
        const collection = db.collection('sat-categories');
        const documents = await collection.find().toArray();

        reply.send(documents);
    });

    /**
     * GET a category with a specified category_name
     */
     app.get('/categories/:category_name', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'Category',
                    properties: {
                        satellite: {
                            _category_name: 'string',
                            id: 'string',
                            name: 'string',
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
        let category_name;

        try {
            category_name = ObjectId(request.params.category_name);
        } catch (error) {
            constructNotFoundError(reply);
        }

        const collection = app.mongo.db.collection('sat-category');

        let satellite = await collection.findOne(
            { _category_name: category_name },
        );


});

};
module.exports = routes;
