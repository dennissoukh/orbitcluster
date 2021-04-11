const data = async (db) => {
    db.createCollection('sat-category', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                properties: {
                    cat_id: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                    name: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    description: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                },
            },
        },
    });
};

module.exports = data;
