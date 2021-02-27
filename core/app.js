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
})


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
    require('./src/plugins/Cors'),
    require('./src/plugins/MongoDB'),
    require('./src/plugins/Helmet')
]

plugins.forEach((plugin) => {
    app.register(plugin.plugin, plugin.options);
})


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
    require('./src/services/application')
]

routes.forEach((route) => {
    app.register(route, Object.assign({ prefix: '/v1' }, route));
})


/*
|--------------------------------------------------------------------------
| Return The Application as a Module
|--------------------------------------------------------------------------
|
| This returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/
module.exports = app
