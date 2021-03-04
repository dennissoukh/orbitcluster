spacetrack.login({
    identity: process.env.SPACETRACK_USERNAME,
    password: process.env.SPACETRACK_PASSWORD
});

spacetrack.get({
    class: 'satcat',
    format: 'json',
    query: [
        {
            field: 'NORAD_CAT_ID',
            condition: '25544,39166,42214'
        }
    ],
    predicates: [
        'OBJECT_NAME', 'NORAD_CAT_ID', 'LAUNCH', 'INTLDES'
    ]
}).then((result) => {
    return result;
}).catch((error) => {
    return error;
});
