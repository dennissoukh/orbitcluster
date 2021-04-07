const data = async (db) => {
    db.createCollection('sat-categories', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                properties: {
                    id: {
                        bsonType: ['string', 'null'],
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
