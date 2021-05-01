const {
    parsePagination,
    generateBasePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    app.get('/operators', {}, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('boxscore');

        let data;
        let count;

        if (request.query.search) {
            const query = await collection.find({
                $or: [
                    { spadoc_cd: new RegExp(request.query.search, 'i') },
                    { country: new RegExp(request.query.search, 'i') },
                ],
            });

            count = await query.count();
            data = await query
                .sort({ country: 1 })
                .skip(skip).limit(limit).toArray();
        } else {
            count = await collection.estimatedDocumentCount();
            data = await collection
                .find()
                .sort({ country: 1 })
                .skip(skip).limit(limit)
                .toArray();
        }

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });

    /**
     * GET satellites of a certain site with a specified spadoc_cd
     */
    app.get('/operators/:id', {}, async (request, reply) => {
        const { page, limit, skip } = parsePagination(request);

        const collection = app.mongo.db.collection('satcat');

        let data;
        let count;

        if (request.query.search) {
            const query = await collection.find({
                country: request.params.id,
                $or: [
                    { satname: new RegExp(request.query.search, 'i') },
                    { object_id: new RegExp(request.query.search, 'i') },
                ],
            });

            count = await query.count();
            data = await query.sort({ norad_cat_id: -1 }).skip(skip).limit(limit).toArray();
        } else {
            count = await collection.find({ country: request.params.id }).count();
            data = await collection
                .find({ country: request.params.id })
                .sort({ norad_cat_id: -1 })
                .skip(skip).limit(limit)
                .toArray();
        }

        const metadata = generateBasePaginationMetadata(page, limit, count, skip, data.length);

        reply.send({ metadata, data });
    });
};

module.exports = routes;
