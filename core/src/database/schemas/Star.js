const data = async (db) => {
    db.createCollection('hyg-star', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                properties: {
                    id: {
                        bsonType: 'int',
                    },
                    hip: {
                        bsonType: 'int',
                    },
                    hd: {
                        bsonType: 'int',
                    },
                    hr: {
                        bsonType: 'int',
                    },
                    gl: {
                        bsonType: 'string',
                    },
                    bf: {
                        bsonType: 'string',
                    },
                    proper: {
                        bsonType: 'string',
                    },
                    ra: {
                        bsonType: 'double',
                    },
                    dec: {
                        bsonType: 'double',
                    },
                    dist: {
                        bsonType: 'double',
                    },
                    pmra: {
                        bsonType: 'double',
                    },
                    pmdec: {
                        bsonType: 'double',
                    },
                    rv: {
                        bsonType: 'double',
                    },
                    mag: {
                        bsonType: 'double',
                    },
                    absmag: {
                        bsonType: 'double',
                    },
                    spect: {
                        bsonType: 'string',
                    },
                    ci: {
                        bsonType: 'double',
                    },
                    x: {
                        bsonType: 'double',
                    },
                    y: {
                        bsonType: 'double',
                    },
                    z: {
                        bsonType: 'double',
                    },
                    vx: {
                        bsonType: 'double',
                    },
                    vy: {
                        bsonType: 'double',
                    },
                    vz: {
                        bsonType: 'double',
                    },
                    rarad: {
                        bsonType: 'double',
                    },
                    decrad: {
                        bsonType: 'double',
                    },
                    pmrarad: {
                        bsonType: 'double',
                    },
                    pmdecrad: {
                        bsonType: 'double',
                    },
                    bayer: {
                        bsonType: 'string',
                    },
                    flam: {
                        bsonType: 'int',
                    },
                    con: {
                        bsonType: 'string',
                    },
                    comp: {
                        bsonType: 'int',
                    },
                    comp_primary: {
                        bsonType: 'int',
                    },
                    base: {
                        bsonType: 'string',
                    },
                    lum: {
                        bsonType: 'double',
                    },
                    var: {
                        bsonType: 'string',
                    },
                    var_min: {
                        bsonType: 'double',
                    },
                    var_max: {
                        bsonType: 'double',
                    },
                },
            },
        },
    });
};

module.exports = data;
