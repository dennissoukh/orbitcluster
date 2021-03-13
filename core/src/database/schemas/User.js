const data = async (db) => {
    db.createCollection('user', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['name', 'email', 'username', 'password', 'location', 'created_at', 'updated_at'],
                properties: {
                    name: {
                        bsonType: 'object',
                        required: ['first_name', 'last_name'],
                        properties: {
                            first_name: {
                                bsonType: 'string',
                                description: 'must be a string and is required',
                            },
                            last_name: {
                                bsonType: 'string',
                                description: 'must be a string and is required',
                            },
                        },
                    },
                    email: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    username: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    password: {
                        bsonType: 'string',
                        description: 'must be a string and is required',
                    },
                    location: {
                        bsonType: 'object',
                        required: ['name', 'latitude', 'longitude', 'elevation'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: 'must be a string and is required',
                            },
                            latitude: {
                                bsonType: 'double',
                                description: 'must be a double and is required',
                            },
                            longitude: {
                                bsonType: 'double',
                                description: 'must be a double and is required',
                            },
                            elevation: {
                                bsonType: 'double',
                                description: 'must be a double and is required',
                            },
                        },
                    },
                    created_at: {
                        bsonType: 'date',
                        description: 'must be a date and is automatically provided',
                    },
                    updated_at: {
                        bsonType: 'date',
                        description: 'must be a date and is automatically provided',
                    },
                },
            },
        },
    });
};

module.exports = data;
