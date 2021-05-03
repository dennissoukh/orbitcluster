const {
    parsePagination,
    generateBasePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    app.get('/launch-sites', {}, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('launch-site');
        const count = await collection.estimatedDocumentCount();
        const data = await collection.find().sort({ site_code: 1 })
            .skip(skip).limit(limit)
            .toArray();

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });

    app.get('/launch-sites/:id', {}, async (request, reply) => {
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
