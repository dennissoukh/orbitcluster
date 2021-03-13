const routes = async (app, opts, done) => {
    app.get('/', opts, async (request, reply) => {
        reply.send({ message: 'Welcome to the Orbitcluster API!' });
    });

    done();
};

module.exports = routes;
