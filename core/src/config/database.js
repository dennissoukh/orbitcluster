module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work.
    |
    */

   default: env('DB_CONNECTION', 'mongodb'),

   /*
   |--------------------------------------------------------------------------
   | Database Connections
   |--------------------------------------------------------------------------
   |
   | Here are each of the database connections setup for your application.
   |
   */
    connections: [
        mongodb = {
            driver:             'mongodb',
            url:                env('DB_URL', 'mongodb://'),
            host:               env('DB_HOST', '127.0.0.1'),
            port:               env('DB_PORT', '27017'),
            database:           env('DB_DATABASE', 'orbitcluster'),
            username:           env('DB_USERNAME', 'user'),
            password:           env('DB_PASSWORD', 'password'),
            charset:            'utf8',
            collation:          'utf8_unicode_ci',
            authorization:      false,
            clusterAuthMode:    'keyFile',
            strict:             true,
            clientLogData:      true,
            encryption:         'disabled',
        }
    ]

};
