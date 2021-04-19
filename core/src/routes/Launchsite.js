const { ObjectId } = require('mongodb');
const {
    constructNotFoundError,
    notFoundMessageContract,
    paginationKeyContract,
    parsePagination,
    generatePaginationMetadata,
} = require('../helpers/route');

const routes = async (app, opts) => {
        app.get('/launchsites', {
            schema: {
                response: {
                    200: {
                        type: 'object',
                        description: 'Launch Site',
                        properties: {
                            data: {  type: 'array' },
                            _metadata: paginationKeyContract,
                        },
                    },
                },
            },
        }, async (request, reply) => {
            const { page, limit, skip } = parsePagination(request);
            const paginationMetadata = generatePaginationMetadata(page, limit);

            const collection = app.mongo.db.collection('launch-site');
            const launchSite = await collection.find()
                .sort({ site_code: 1 }).toArray();

            reply.send({ _metadata: paginationMetadata, data: launchSite });
    });


    /**
     * GET a launch site with a specified _id
     */
     app.get('/launchsites/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    //description: 'Launch site',
                    properties: {
                        launchSite: {
                            _id: 'string',
                            site_code: 'string',
                            launch_site: 'string',
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
        let id;

        try {
            id = ObjectId(request.params.id);
        } catch (error) {
            constructNotFoundError(reply);
        }

        const collection = app.mongo.db.collection('launch-site');

        let launchSite = await collection.findOne(
            { _id: id },
        );

        if (!launchSite) {
            constructNotFoundError(reply);
        }
        reply.send({ launchSite });
    });
};

module.exports = routes;
