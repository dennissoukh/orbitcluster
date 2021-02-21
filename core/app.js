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
app.get('/', function (request, reply) {
    reply.send({ message: 'Hello, world!' })
});

module.exports = app;
