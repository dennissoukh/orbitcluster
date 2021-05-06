const {
    parsePagination,
    generateBasePaginationMetadata,
} = require('../helpers/route');

const routes = async (app, opts) => {
    app.get('/categories', {
        schema: {
            response: {
              200: {
                type: 'object',
                properties: {
                  data: {
                      type: 'array',
                    },
                },
            },
        },
    },
    }, async (request, reply) => {
        // Get an instance of the application database
        const { db } = app.mongo;

        // Get the database collection
        const collection = db.collection('sat-category');
        const documents = await collection.find().toArray();

        reply.send({ data: documents });
    });

    /**
     * GET a category with a specified cat_id
     */
    app.get('/categories/:id', {
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

        if (request.query.search) {
            const query = await collection.find({
                $in: { categories: [request.params.id] },
                $or: [
                    { satname: new RegExp(request.query.search, 'i') },
                    { object_id: new RegExp(request.query.search, 'i') },
                ],
            });

            count = await query.count();
            data = await query.sort({ norad_cat_id: -1 }).skip(skip).limit(limit).toArray();
        } else {
            count = await collection.find({ categories: { $in: [request.params.id] } }).count();
            data = await collection
                .find({ categories: { $in: [request.params.id] } })
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit)
                .toArray();
        }

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });
};

module.exports = routes;

