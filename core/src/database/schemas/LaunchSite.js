const data = async (db) => {
    db.createCollection('launch-site', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['site_code', 'launch_site'],
                properties: {
                    site_code: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    launch_site: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    description: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    location: {
                        bsonType: ['object', 'null'],
                        required: ['lat', 'long'],
                        properties: {
                            lat: {
                                bsonType: 'double',
                                description: 'must be an double',
                            },
                            long: {
                                bsonType: 'double',
                                description: 'must be a double',
                            },
                        },
                    },
                },
            },
        },
    });
};

module.exports = data;
