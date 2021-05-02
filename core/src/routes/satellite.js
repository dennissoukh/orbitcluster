const { ObjectId } = require('mongodb');
const {
    constructNotFoundError,
    notFoundMessageContract,
    paginationKeyContract,
    parsePagination,
    generatePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    /**
     * GET list of satellites with pagination
     */
    app.get('/satellites', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'The base listing of the satellite catalog',
                    properties: {
                        data: { type: 'array' },
                        _metadata: paginationKeyContract,
                    },
                },
            },
        },
    }, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);
        const paginationMetadata = generatePaginationMetadata(page, limit);

        const collection = app.mongo.db.collection('satcat');
        const satellites = await collection.find()
            .sort({ norad_cat_id: 1 }).skip(skip).limit(limit)
            .toArray();

        reply.send({ _metadata: paginationMetadata, data: satellites });
    });

    /**
     * GET a satellite with a specified NORAD catalog ID
     */
    app.get('/satellites/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    description: 'The core satellite object',
                    properties: {
                        satellite: {
                            _id: 'string',
                            intldes: 'string',
                            norad_cat_id: 'int',
                            object_type: 'string',
                            satname: 'string',
                            country: 'string',
                            launch: 'date',
                            site: 'string',
                            decay: 'date',
                            rcsvalue: 'int',
                            rcs_size: 'string',
                            launch_year: 'int',
                            launch_num: 'int',
                            launch_piece: 'string',
                            current: 'string',
                            object_name: 'string',
                            object_number: 'int',
                            categories: 'array',
                            data: 'object',
                            gp: 'object',
                            tles: 'array',
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

        const collection = app.mongo.db.collection('satcat');

        let satellite = await collection.findOne(
            { _id: id },
        );

        if (!satellite) {
            constructNotFoundError(reply);
        }

        satellite = await collection.aggregate([
            {
                $match: {
                    norad_cat_id: satellite.norad_cat_id,
                },
            },
            {
                $lookup: {
                    from: 'sat-data',
                    localField: 'norad_cat_id',
                    foreignField: 'norad_cat_id',
                    as: 'data',
                },
            },
            {
                $unwind: {
                    path: '$data',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'general-perturbation',
                    localField: 'norad_cat_id',
                    foreignField: 'norad_cat_id',
                    as: 'gp',
                },
            },
            {
                $unwind: {
                    path: '$gp',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'tle-data',
                    localField: 'norad_cat_id',
                    foreignField: 'norad_cat_id',
                    as: 'tles',
                },
            },
        ]).toArray();

        [satellite] = satellite;

        reply.send({ satellite });
    });
};

module.exports = routes;
