const data = async (app) => {
    app.mongo.db.createCollection("general-perturbation", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["originator", "norad_cat_id"],
                properties: {
                    originator: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    epoch: {
                        bsonType: "date",
                        description: "must be a date"
                    },
                    mean_motion: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    eccentricity: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    inclination: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    ra_of_asc_node: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    arg_of_pericenter: {
                        bsonType: "double",
                        description: "must be an double"
                    },
                    mean_anomaly: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    ephemeris_type: {
                        bsonType: "int",
                        description: "must be an int"
                    },
                    classification_type: {
                        bsonType: "string",
                        description: "must be a string"
                    },
                    norad_cat_id: {
                        bsonType: "int",
                        description: "must be an int and is required"
                    },
                    element_set_no: {
                        bsonType: "int",
                        description: "must be an int"
                    },
                    rev_at_epoch: {
                        bsonType: "int",
                        description: "must be a int"
                    },
                    bstar: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    mean_motion_dot: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    mean_motion_ddot: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    semimajor_axis: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    period: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    apoapsis: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    periapsis: {
                        bsonType: "double",
                        description: "must be a double"
                    },
                    tle_line0: {
                        bsonType: "string",
                        description: "must be a string"
                    },
                    tle_line1: {
                        bsonType: "string",
                        description: "must be a string"
                    },
                    tle_line2: {
                        bsonType: "string",
                        description: "must be a string"
                    }
                }
            }
        }
    })
}

module.exports = data
