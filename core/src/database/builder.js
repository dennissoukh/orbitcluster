const builder = async (app, options, done) => {
    const db = await app.mongo.db;

    // Load collection validation schemas
    const schemas = [
        { schema: require('./schemas/GeneralPerturbation'), name: 'general-perturbation' },
        { schema: require('./schemas/LaunchSite'), name: 'launch-site' },
        { schema: require('./schemas/Satellite'), name: 'satcat' },
        { schema: require('./schemas/User'), name: 'user' },
        { schema: require('./schemas/Star'), name: 'hyg-star' },
    ];

    // Create the validation schemas if they don't exist already
    const active = await db.listCollections().toArray();
    schemas.forEach((schema) => {
        if (!active.find((s) => { return s.name === schema.name; })) {
            (() => { return schema.schema(db); })();
        }
    });

    done();
};

module.exports = builder;
