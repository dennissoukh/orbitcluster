const Neuron = require('./Neuron');

class Ignitor {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }

    neuron() {
        return new Neuron(this.appRoot);
    }

    fireNeuron() {
        try {
            new Neuron(this.appRoot).handle(process.argv.splice(2));
        } catch (error) {
            throw new Error(error);
        }

        return this;
    }

    shutdown() {
        return this.appRoot.close();
    }
}

module.exports = Ignitor;
