const { ObjectId } = require('mongodb');
const {
    constructNotFoundError,
    parsePagination,
    generateBasePaginationMetadata,
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
                    properties: {
                        metadata: {
                            type: 'object',
                            properties: {
                                page: { type: 'number' },
                                limit: { type: 'number' },
                                pages: { type: 'number' },
                                count: { type: 'number' },
                                skip: { type: 'number' },
                                pageCount: { type: 'number' },
                            },
                        },
                        data: {
                            type: 'array',
                            // properties: {
                            //     _id: { type: 'string' },
                            //     intldes: { type: 'string' },
                            //     norad_cat_id: { type: 'number' },
                            //     object_type: { type: 'string' },
                            //     satname: { type: 'string' },
                            //     country: { type: 'string' },
                            //     launch: { type: 'string' },
                            //     site: { type: 'string' },
                            //     decay: { type: 'string' },
                            //     rcsvalue: { type: 'string' },
                            //     rcs_size: { type: 'string' },
                            //     launch_year: { type: 'number' },
                            //     launch_num: { type: 'number' },
                            //     launch_piece: { type: 'string' },
                            //     current: { type: 'string' },
                            //     object_name: { type: 'string' },
                            //     object_id: { type: 'string' },
                            //     object_number: { type: 'number' },
                            // },
                        },
                    },
                },
            },
        },
    }, async (request, reply) => {
        // Parse pagination request
        const { page, limit, skip } = parsePagination(request);

        // Get database collection
        const collection = app.mongo.db.collection('satcat');

        // Data to return
        let data;

        // Number of documents that are getting returned
        let count;

        // Check if a search statement exists in the query
        if (request.query.search) {
            // Search collection
            const query = await collection.find({
                $or: [
                    {
                        satname: new RegExp(request.query.search, 'i'),
                    },
                    {
                        object_id: new RegExp(request.query.search, 'i'),
                    },
                ],
            });

            // Count results, sort and convert to array
            count = await query.count();
            data = await query.sort({ norad_cat_id: 1 })
                .skip(skip).limit(limit).toArray();
        } else {
            count = await collection.estimatedDocumentCount();
            data = await collection.find().sort({ norad_cat_id: 1 })
                .skip(skip).limit(limit)
                .toArray();
        }

        // Generate pagination metadata
        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });

    /**
     * GET a satellite with a specified identifier
     */
    app.get('/satellites/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        metadata: {
                            type: 'object',
                            properties: {
                                page: { type: 'number' },
                                limit: { type: 'number' },
                                pages: { type: 'number' },
                                count: { type: 'number' },
                                skip: { type: 'number' },
                                pageCount: { type: 'number' },
                            },
                        },
                        data: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                intldes: { type: 'string' },
                                norad_cat_id: { type: 'number' },
                                object_type: { type: 'string' },
                                satname: { type: 'string' },
                                country: { type: 'string' },
                                launch: { type: 'string' },
                                site: { type: 'string' },
                                decay: { type: 'string' },
                                rcsvalue: { type: 'string' },
                                rcs_size: { type: 'string' },
                                launch_year: { type: 'number' },
                                launch_num: { type: 'number' },
                                launch_piece: { type: 'string' },
                                current: { type: 'string' },
                                object_name: { type: 'string' },
                                object_id: { type: 'string' },
                                object_number: { type: 'number' },
                                tles: { type: 'array' },
                            },
                        },
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

        let data = await collection.findOne(
            { _id: id },
        );

        if (!data) {
            constructNotFoundError(reply);
        }

        data = await collection.aggregate([
            {
                $match: {
                    norad_cat_id: data.norad_cat_id,
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

        [data] = data;

        reply.send({ data });
    });

    /**
     * GET a satellite with a specified identifier(+ TLE's)
     */
    app.get('/orbit/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        metadata: {
                            type: 'object',
                            properties: {
                                page: { type: 'number' },
                                limit: { type: 'number' },
                                pages: { type: 'number' },
                                count: { type: 'number' },
                                skip: { type: 'number' },
                                pageCount: { type: 'number' },
                            },
                        },
                        data: {
                            type: 'array',
                            properties: {
                                _id: { type: 'string' },
                                intldes: { type: 'string' },
                                norad_cat_id: { type: 'number' },
                                object_type: { type: 'string' },
                                satname: { type: 'string' },
                                country: { type: 'string' },
                                launch: { type: 'string' },
                                site: { type: 'string' },
                                decay: { type: 'string' },
                                rcsvalue: { type: 'string' },
                                rcs_size: { type: 'string' },
                                launch_year: { type: 'number' },
                                launch_num: { type: 'number' },
                                launch_piece: { type: 'string' },
                                current: { type: 'string' },
                                object_name: { type: 'string' },
                                object_id: { type: 'string' },
                                object_number: { type: 'number' },
                                tles: { type: 'array' },
                            },
                        },
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

        let data = await collection.findOne(
            { _id: id },
        );

        if (!data) {
            constructNotFoundError(reply);
        }

        data = await collection.aggregate([
            {
                $match: {
                    norad_cat_id: data.norad_cat_id,
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

        [data] = data;

        reply.send({ data });
    });
};

module.exports = routes;
