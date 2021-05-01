const {
    parsePagination,
    generateBasePaginationMetadata,
} = require('../helpers/route');

const routes = async (app) => {
    /**
     * GET list of recently launched satellites with pagination
     */
    app.get('/recent/new', {}, async (request, reply) => {
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
    app.get('/recent/decayed', {}, async (request, reply) => {
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
