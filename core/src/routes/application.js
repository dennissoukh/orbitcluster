const routes = async (app, opts) => {
    app.get('/', opts, async (request, reply) => {
        reply.send({ message: 'Welcome to the Orbitcluster API!' });
    });
};

module.exports = routes;
