module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. Adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    | Based on Fastify Cors package: https://github.com/fastify/fastify-cors
    |
    */

    /**
     * Configure the Access-Control-Allow-Origin CORS header.
     * @type {Boolean|String|RegExp|Array|Function}
     */

    origin: true,

    /**
     * Configure the Access-Control-Allow-Methods CORS header.
     * @type {Array}
     */

    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],

    /**
     * Configure the Access-Control-Allow-Headers CORS header.
     * @type {Array}
     */

    allowedHeaders: [],

    /**
     * Configure the Access-Control-Expose-Headers CORS header.
     * @type {Array}
     */

    exposedHeaders: [],

    /**
     * Configure the Access-Control-Allow-Credentials CORS header.
     * @type {Boolean}
     */

    credentials: true,

    /**
     * Configures the Access-Control-Max-Age CORS header. In seconds.
     * Set to 0 to disable.
     * @type {Number|null}
     */

    maxAge: 0,

    /**
     * Pass the CORS preflight response to the route handler.
     */

    preflightContinue: false,

    /**
     * Provides a status code to use for successful OPTIONS requests.
     * @type {Number}
     */

    optionsSuccessStatus: 204,

    /**
     * Enable or disable CORS preflight.
     * @type {Boolean}
     */

    preflight: true,

    /**
     * Enforces strict requirement of the CORS preflight request headers
     * (Access-Control-Request-Method and Origin) as defined by the W3C
     * CORS specification. Preflight requests without the required headers
     * will result in 400 errors when set to true.
     * @type {Boolean}
     */

    strictPreflight: true,

    /**
     * Hide options route from the documentation built using fastify-swagger.
     * @type {Boolean}
     *
     */

    hideOptionsRoute: true,

};
