const { ObjectId } = require('mongodb');
const {
    paginationKeyContract,
    parsePagination,
    generatePaginationMetadata,
} = require('../helpers/route');

const routes = async (app, opts) => {
        app.get('/boxscore', {
            schema: {
                response: {
                    200: {
                        type: 'object',
                        description: 'Boxscore',
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

            const collection = app.mongo.db.collection('boxscore');
            const boxscore = await collection.find().sort({ country: 1 }).toArray();

            reply.send({ _metadata: paginationMetadata, data: boxscore });
    });
};
module.exports = routes;
