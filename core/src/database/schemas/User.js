const data = async (db) => {
    db.createCollection("user", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "email", "user_name", "password", "location", "created_at", "updated_at"],
                properties: {
                    name: {
                        bsonType: "object",
                        required: ["first_name", "last_name"],
                        properties: {
                            first_name: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            last_name: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            }
                        }
                    },
                    email: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    user_name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    password: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    location: {
                        bsonType: "object",
                        required: ["city"],
                        properties: {
                            street: {
                                bsonType: "string",
                                description: "must be a string if the field exists"
                            },
                            city: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            }
                        }
                    },
                    created_at: {
                        bsonType: "date",
                        description: "must be a date and is automatically provided"
                    },
                    updated_at: {
                        bsonType: "date",
                        description: "must be a date and is automatically provided"
                    }
                }
            }
        }
    })
}

module.exports = data
