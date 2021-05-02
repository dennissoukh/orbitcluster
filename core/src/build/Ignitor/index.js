"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ignitor = void 0;
const Application_1 = require("../Orbitcluster/Application");
const Neuron_1 = require("./Neuron");
/**
 * Ignitor is used to wireup different pieces of the Orbitcluster application
 * together.
 */
class Ignitor {
    constructor(fastify, appRoot) {
        this.fastify = fastify;
        this.appRoot = appRoot;
    }
    /**
     * Returns an instance of the application.
     */
    application(environment) {
        return new Application_1.Application(this.fastify, environment, this.appRoot);
    }
    /**
     * Returns instance of Neuron to handle console commands
     */
    neuron() {
        return new Neuron_1.Neuron(this.fastify, this.appRoot);
    }
}
exports.Ignitor = Ignitor;
