const {
    parsePagination,
    generateBasePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    app.get('/launch-sites', {
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
                            }
                        },
                        data: {
                            type: 'array',
                            properties: {
                            _id: { type: 'string' },
                            site_code: { type: 'string' },
                            launch_site: { type: 'string' },
                        }
                    }
                },
            }
            }
        }
    }, async (request, reply) => {

        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('launch-site');

        let data;
        let count;

        count = await collection.estimatedDocumentCount();
        data = await collection.find().sort({ site_code: 1 })
            .skip(skip).limit(limit)
            .toArray();

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });

    app.get('/launch-sites/:id', {
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
                        }
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
                            categories: { type: 'array'},
                        }
                    }
                },
            }
            }
        }
    }, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('satcat');

        let data;
        let count;

        if (request.query.search) {
            const query = await collection.find({
                site: request.params.id,
                $or: [
                    { satname: new RegExp(request.query.search, 'i') },
                    { object_id: new RegExp(request.query.search, 'i') },
                ],
            });

            count = await query.count();
            data = await query.sort({ norad_cat_id: -1 }).skip(skip).limit(limit).toArray();
        } else {
            count = await collection.find({ site: request.params.id }).count();
            data = await collection
                .find({ site: request.params.id })
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit)
                .toArray();
        }

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });
};

module.exports = routes;
