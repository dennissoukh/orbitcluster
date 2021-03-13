module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Connection
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work.
    |
    */

    connection: 'mongodb',

    /*
   |--------------------------------------------------------------------------
   | Database Connections
   |--------------------------------------------------------------------------
   |
   | Here are each of the database connections setup for your application.
   |
   */

    connections: {
        mongodb: {
            url: 'mongodb://localhost:27017/orbitcluster',
            name: 'orbitcluster-main',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            forceClose: true,
        },
    },

};
