const {
    parsePagination,
    generateBasePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    /**
     * GET list of recently launched satellites with pagination
     */
    app.get('/recent/new', {
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
                            },
                        },
                    },
                },
            },
        },
    }, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('satcat');

        let data;
        let count;

        const to = new Date();
        const from = new Date(new Date().setDate(new Date().getDate() - 30));

        if (request.query.search) {
            const query = await collection.find({
                launch: { $gte: from, $lte: to },
                $or: [
                    {
                        satname: new RegExp(request.query.search, 'i'),
                    },
                    {
                        object_id: new RegExp(request.query.search, 'i'),
                    },
                ],
            });

            count = await query.count();
            data = await query
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit).toArray();
        } else {
            data = await collection
                .find({ launch: { $gte: from, $lte: to } })
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit)
                .toArray();

            count = await collection.find({ launch: { $gte: from, $lte: to } }).count();
        }

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });

    /**
     * GET list of recently decayed satellites with pagination
     */
    app.get('/recent/decayed', {
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
                            },
                        },
                    },
                },
            },
        },
    }, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('satcat');

        let data;
        let count;

        const to = new Date();
        const from = new Date(new Date().setDate(new Date().getDate() - 30));

        if (request.query.search) {
            const query = await collection.find({
                decay: { $gte: from, $lte: to },
                $or: [
                    {
                        satname: new RegExp(request.query.search, 'i'),
                    },
                    {
                        object_id: new RegExp(request.query.search, 'i'),
                    },
                ],
            });

            count = await query.count();
            data = await query
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit).toArray();
        } else {
            data = await collection
                .find({ decay: { $gte: from, $lte: to } })
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit)
                .toArray();

            count = await collection.find({ decay: { $gte: from, $lte: to } }).count();
        }

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });
};

module.exports = routes;
