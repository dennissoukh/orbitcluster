const data = async (db) => {
    db.createCollection('satcat', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['norad_cat_id'],
                properties: {
                    intldes: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    norad_cat_id: {
                        bsonType: 'int',
                        description: 'must be an int',
                    },
                    object_type: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                    satname: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    country: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string and is required',
                    },
                    launch: {
                        bsonType: ['date', 'null'],
                        description: 'must be a date',
                    },
                    site: {
                        bsonType: ['string', 'null'],
                        description: 'must be an string',
                    },
                    decay: {
                        bsonType: ['date', 'null'],
                        description: 'must be a date',
                    },
                    rcsvalue: {
                        bsonType: 'int',
                        description: 'must be an int and is required',
                    },
                    rcs_size: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    launch_year: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int and is required',
                    },
                    launch_num: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int and is required',
                    },
                    launch_piece: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string and is required',
                    },
                    current: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string and is required',
                    },
                    object_name: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string and is required',
                    },
                    object_id: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string and is required',
                    },
                    object_number: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int ',
                    },
                },
            },
        },
    });
};

module.exports = data;
