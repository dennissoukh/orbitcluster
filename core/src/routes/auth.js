const routes = async (app) => {
   // app.get('/register', {
    app.post('/register', {
    }, async (request, reply) => {
        const userInput = request.body
       // const token = app.jwt.sign({ foo: 'bar' });
        reply.send({ userInput });
    });
};
module.exports = routes;
