const {
    notFoundMessageContract,
    paginationKeyContract,
    parsePagination,
    generatePaginationMetadata,
    constructNotFoundError,
} = require('../helpers/route');

const routes = async (app) => {
    app.get('/boxscore', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'Boxscore',
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

        const collection = app.mongo.db.collection('boxscore');
        const boxscore = await collection.find().sort({ country: 1 }).toArray();

        reply.send({ _metadata: paginationMetadata, data: boxscore });
    });

    /**
     * GET satellites of a certain site with a specified spadoc_cd
     */
    app.get('/boxscore/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        operators: {
                            _id: 'string',
                            country: 'string',
                            spadoc_cd: 'string',
                            orbital_tba: 'int',
                            orbital_payload_count: 'int',
                            orbital_rocket_body_count: 'int',
                            orbital_debris_count: 'int',
                            orbital_total_count: 'int',
                            decayed_payload_count: 'int',
                            decayed_rocket_body_count: 'int',
                            decayed_debris_count: 'int',
                            decayed_total_count: 'int',
                            country_total: 'int',
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
        const collection = app.mongo.db.collection('boxscore');

        let operators = await collection.findOne(
            { spadoc_cd: request.params.id },
        );

        if (!operators) {
            constructNotFoundError(reply);
        }

        operators = await collection.aggregate([
            {
                $match: {
                    spadoc_cd: operators.spadoc_cd,
                },
            },
            {
                $lookup: {
                    from: 'satcat',
                    localField: 'spadoc_cd',
                    foreignField: 'country',
                    as: 'operators',
                },
            },
        ]).toArray();

        [operators] = operators;

        reply.send({ operators });
    });
};

module.exports = routes;
