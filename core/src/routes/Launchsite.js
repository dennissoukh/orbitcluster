const {
    constructNotFoundError,
    notFoundMessageContract,
    paginationKeyContract,
    parsePagination,
    generatePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    app.get('/launchsites', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'Launch Site',
                    properties: {
                        data: { type: 'array' },
                        _metadata: paginationKeyContract,
                    },
                },
            },
        },
    }, async (request, reply) => {
        const { page, limit } = parsePagination(request);
        const paginationMetadata = generatePaginationMetadata(page, limit);

        const collection = app.mongo.db.collection('launch-site');
        const launchSite = await collection.find()
            .sort({ site_code: 1 }).toArray();

        reply.send({ _metadata: paginationMetadata, data: launchSite });
    });

    /**
     * GET satellites of a certain site with a specified site_code
     **/
    app.get('/launchsites/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    // description: 'Launch site',
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
        const collection = app.mongo.db.collection('launch-site');

        let launchSite = await collection.findOne(
            { site_code: request.params.id },
        );

        if (!launchSite) {
            constructNotFoundError(reply);
        }

        launchSite = await collection.aggregate([
            {
                $match: {
                    site_code: launchSite.site_code,
                },
            },
            {
                $lookup: {
                    from: 'satcat',
                    localField: 'site_code',
                    foreignField: 'site',
                    as: 'satellites',
                },
            },
        ]).toArray();

        [launchSite] = launchSite;

        reply.send({ launchSite });
    });
};

module.exports = routes;
