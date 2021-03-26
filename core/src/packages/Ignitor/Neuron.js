const App = require('./App');

class Neuron {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }

    async handle(argv) {
        // Proxy over to the Orbitcluster Neuron package
        await new App(this.appRoot).handle(argv);
    }
}

module.exports = Neuron;
