const App = require('./App');

class Neuron {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }

    async handle(argv) {
        // Proxy over to application commands
        await new App(this.appRoot, 'neuron').handle(argv);
    }
}

module.exports = Neuron;
