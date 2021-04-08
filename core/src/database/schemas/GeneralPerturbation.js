const data = async (db) => {
    db.createCollection('general-perturbation', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['norad_cat_id'],
                properties: {
                    originator: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string and is required',
                    },
                    epoch: {
                        bsonType: ['date', 'null'],
                        description: 'must be a date',
                    },
                    mean_motion: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    eccentricity: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    inclination: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    ra_of_asc_node: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    arg_of_pericenter: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be an double',
                    },
                    mean_anomaly: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    ephemeris_type: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    classification_type: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    norad_cat_id: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int and is required',
                    },
                    element_set_no: {
                        bsonType: ['int', 'null'],
                        description: 'must be an int',
                    },
                    rev_at_epoch: {
                        bsonType: ['int', 'null'],
                        description: 'must be a int',
                    },
                    bstar: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    mean_motion_dot: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    mean_motion_ddot: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    semimajor_axis: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    period: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    apoapsis: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    periapsis: {
                        bsonType: ['double', 'null', 'int'],
                        description: 'must be a double',
                    },
                    tle_line0: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    tle_line1: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                    tle_line2: {
                        bsonType: ['string', 'null'],
                        description: 'must be a string',
                    },
                },
            },
        },
    });
};

module.exports = data;
