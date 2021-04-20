const {
    paginationKeyContract,
    parsePagination,
    generatePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    /**
     * GET list of satellites with pagination
     */
    app.get('/recent/new', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'Recently launched satellites',
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

        const to = new Date();
        const from = new Date(new Date().setDate(new Date().getDate() - 30));

        const collection = app.mongo.db.collection('satcat');
        const satellites = await collection.find({ launch: { $gt: from, $lt: to } }).toArray();
        reply.send({ _metadata: paginationMetadata, data: satellites });
    });

    app.get('/recent/decayed', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'Recently decayed satellites',
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

        const to = new Date();
        const from = new Date(new Date().setDate(new Date().getDate() - 30));

        const collection = app.mongo.db.collection('satcat');
        const satellites = await collection.find({ decay: { $gt: from, $lt: to } }).toArray();
        reply.send({ _metadata: paginationMetadata, data: satellites });
    });
};
module.exports = routes;
