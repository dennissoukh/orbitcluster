/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Fastify application instance
| which serves as the "glue" for all the components of this application.
|
*/
const app = require('fastify')({
    logger: true
});

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/
require('./src/lib/Bootstrap');

// Create and load application configs
global.appConfig            = {};
global.appConfig.database   = require('./src/config/database');

/*
|--------------------------------------------------------------------------
| Bind Database
|--------------------------------------------------------------------------
|
| Bind the MongoDB database using the Fastify MongoDB connection plugin,
| allowing the sharing of the same MongoDB connection pool in every part
| of the server.
|
*/
app.register(require('fastify-mongodb'), {
    forceClose: true,
    url: 'mongodb://localhost:27017/orbitcluster',
    name: 'orbitcluster-main',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a temporary, test route
app.get('/', function (request, reply) {
    reply.send({ message: inspire() });
});

module.exports = app;
