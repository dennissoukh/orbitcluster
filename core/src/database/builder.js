const builder = async (app, options, done) => {
    const db = await app.mongo.db;

    // Load collection validation schemas
    const schemas = [
        { schema: require('./schemas/GeneralPertubation'), name: 'general-pertubation' },
        { schema: require('./schemas/LaunchSite'), name: 'launch-site' },
        { schema: require('./schemas/Satellite'), name: 'satcat' },
        { schema: require('./schemas/User'), name: 'user' },
    ]

    // We'll create the validation schemas if they don't exist already
    schemas.forEach((schema) => {
        if (!db.collection(schema.name)) {
            (() => schema.schema(db))();
        }
    })

    done()
}

module.exports = builder
