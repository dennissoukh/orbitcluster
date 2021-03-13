module.exports = {

    /*
    |--------------------------------------------------------------------------
    | JWT Configuration
    |--------------------------------------------------------------------------
    |
    | See: https://github.com/fastify/fastify-jwt
    |
    */

    secret: 'supersecret',

    cookie: {
        cookieName: 'authToken',
    },

};
