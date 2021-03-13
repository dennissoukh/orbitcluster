const data = async (db) => {
    db.createCollection('satcat', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['intldes', 'satname', 'country', 'rcsvalue', 'launch_year', 'launch_num', 'launch_piece', 'current', 'object_name', 'object_id', 'details'],
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
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    launch: {
                        bsonType: 'date',
                        description: 'must be a date',
                    },
                    site: {
                        bsonType: 'string',
                        description: 'must be an string',
                    },
                    decay: {
                        bsonType: 'date',
                        description: 'must be a date',
                    },
                    rcsvalue: {
                        bsonType: 'int',
                        description: 'must be an int and is required',
                    },
                    rcs_size: {
                        bsonType: 'string',
                        description: 'must be a string',
                    },
                    launch_year: {
                        bsonType: 'int',
                        description: 'must be an int and is required',
                    },
                    launch_num: {
                        bsonType: 'int',
                        description: 'must be an int and is required',
                    },
                    launch_piece: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    current: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    object_name: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    object_id: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    object_number: {
                        bsonType: 'int unsigned',
                        description: 'must be an int ',
                    },
                    details: {
                        bsonType: 'object',
                        properties: {
                            alternate_name: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            un_registry: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            country_operator_owner: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            operator_owner: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            users: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            purpose: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            detailed_purpose: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            orbit_class: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            orbit_type: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            launch_mass: {
                                bsonType: 'int',
                                description: 'must be an int',
                            },
                            dry_mass: {
                                bsonType: 'int',
                                description: 'must be an int',
                            },
                            power: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            expected_lifetime: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            contractor: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            contractor_country: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            launch_vehicle: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            description: {
                                bsonType: 'string',
                                description: 'must be a string',
                            },
                            comments: {
                                bsonType: 'string',
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
