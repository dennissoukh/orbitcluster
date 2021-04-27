const data = async (db) => {
    db.createCollection('boxscore', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['spadoc_cd'],
                properties: {
                    country: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string ',
                    },
                    spadoc_cd: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    orbital_tba: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    orbital_payload_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    orbital_rocket_body_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    orbital_debris_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    orbital_total_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    decayed_payload_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    decayed_rocket_body_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    decayed_debris_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    decayed_total_count: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    country_total: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                },
            },
        },
    });
};

module.exports = data;
