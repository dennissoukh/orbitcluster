const data = async (app) => {
    app.mongo.db.createCollection("launch-site", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["site_code", "launch_site", "description", "location"],
                properties: {
                    site_code: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    launch_site: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    description: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    location: {
                        bsonType: "object",
                        required: ["lat", "long"],
                        properties: {
                            lat: {
                                bsonType: "object",
                                description: "must be an object"
                            },
                            long: {
                                bsonType: "double",
                                description: "must be a double"
                            }
                        }
                    }
                }
            }
        }
    })
}

module.exports = data
