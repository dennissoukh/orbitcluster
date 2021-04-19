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
    logger: process.env.APP_DEBUG ? process.env.APP_DEBUG : true,
    ignoreTrailingSlash: true,
});

/*
|--------------------------------------------------------------------------
| Bind Plugins
|--------------------------------------------------------------------------
|
| Bind the required plugins to the application. Fastify creates an
| encapsulation model that allows the splitting of the application in
| multiple microservices at any moment.
|
*/
const plugins = [
    require('./src/plugins/MongoDB'),
    require('./src/plugins/Cors'),
    require('./src/plugins/Helmet'),
    require('./src/plugins/Jwt'),
    require('./src/plugins/Cookie'),
];

plugins.forEach((plugin) => {
    app.register(plugin.plugin, plugin.options);
});

/*
|--------------------------------------------------------------------------
| Bind Routes / Services
|--------------------------------------------------------------------------
|
| Routes are also referred to as services. Each service is a Fastify
| plugin, it is encapsulated (it can have its own independent plugins) and
| it is typically stored in a separate file.
|
*/
const routes = [
    require('./src/routes/application'),
    require('./src/routes/satellite'),
    require('./src/routes/Category'),
    require('./src/routes/Launchsite'),
];

routes.forEach((route) => {
    app.register(route, { prefix: '/v1', ...route });
});

/*
|--------------------------------------------------------------------------
| Register the Database Builder
|--------------------------------------------------------------------------
|
| The database builder contains the validation schema definitions for the
| MongoDB database that the app is using. We register the builder so
| that it has access to the application's main database.
|
*/
const builder = require('./src/database/builder');

app.register(builder);

/*
|--------------------------------------------------------------------------
| Return The Application as a Module
|--------------------------------------------------------------------------
|
| This returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses. The
| ready app is returned in the form of a promise.
|
*/
async function ready() {
    return app.ready();
}

module.exports = ready;
