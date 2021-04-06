const data = async (db) => {
    db.createCollection('tle-data', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                properties: {
                    norad_cat_id: {
                        bsonType: 'int',
                        description: 'must be a int',
                    },
                    tle_line0: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                    tle_line1: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                    tle_line2: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                    source: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                },
            },
        },
    });
};

module.exports = data;
