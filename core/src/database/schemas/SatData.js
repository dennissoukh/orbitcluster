const data = async (db) => {
    db.createCollection('sat-data', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['norad_cat_id'],
                properties: {
                    details: {
                        bsonType: 'object',
                        properties: {
                            alternate_name: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            un_registry: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            country_operator_owner: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            operator_owner: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            users: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            purpose: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            detailed_purpose: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            orbit_class: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            orbit_type: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            launch_mass: {
                                bsonType: ['int', 'null'],
                                description: 'must be an int',
                            },
                            dry_mass: {
                                bsonType: ['int', 'null'],
                                description: 'must be an int',
                            },
                            power: {
                                bsonType: ['double', 'null'],
                                description: 'must be a double',
                            },
                            expected_lifetime: {
                                bsonType: ['double', 'null'],
                                description: 'must be a double',
                            },
                            contractor: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            contractor_country: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            launch_vehicle: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            description: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            comments: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            cospar_number: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                            norad_cat_id: {
                                bsonType: 'int',
                                description: 'must be an int and is required',
                            },
                            radio: {
                                bsonType: ['array', 'null'],
                                description: 'must be an array',
                            },
                            length: {
                                bsonType: ['double', 'null'],
                                description: 'must be a double',
                            },
                            width: {
                                bsonType: ['double', 'null'],
                                description: 'must be a double',
                            },
                            depth: {
                                bsonType: ['double', 'null'],
                                description: 'must be a double',
                            },
                            magnitude: {
                                bsonType: ['double', 'null'],
                                description: 'must be a double',
                            },
                            magnitude_source: {
                                bsonType: ['string', 'null'],
                                description: 'must be a string',
                            },
                        },
                    },
                },
            },
        },
    });
};

module.exports = data;
