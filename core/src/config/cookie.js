module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Cookie Configuration
    |--------------------------------------------------------------------------
    |
    | A plugin for Fastify that adds support for reading and setting cookies.
    |
    | To learn more: https://github.com/fastify/fastify-cookie
    |
    */

    /**
     * The signing secret.
     * @type {String|Array|Object}
     */
    secret: 'my-secret',

    /**
     * Specifies a function that will be used to decode a cookie's value. Since
     * the value of a cookie has a limited character set (and must be a simple
     * string), this function can be used to decode a previously-encoded cookie
     * value into a JavaScript string or other object.
     */
    parseOptions: {
        decode: decodeURIComponent
    }

}
