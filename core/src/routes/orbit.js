const { ObjectId } = require('mongodb');
const {
    constructNotFoundError,
} = require('../helpers/route');

const routes = async (app) => {
    app.get('/orbit', {}, async (request, reply) => {
        let id;

        try {
            id = ObjectId(request.query.sat);
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
