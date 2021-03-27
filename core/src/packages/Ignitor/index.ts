import { FastifyInstance } from "fastify";
import { Application } from "../Orbitcluster/Application";
import { AppEnvironments } from "../Orbitcluster/Contracts";
import { Neuron } from "./Neuron";
/**
 * Ignitor is used to wireup different pieces of the Orbitcluster application
 * together.
 */
export class Ignitor {
    constructor(private fastify: FastifyInstance, private appRoot: string) {}

    /**
     * Returns an instance of the application.
     */
    public application(environment: AppEnvironments) {
        return new Application(this.fastify, environment, this.appRoot);
    }

    /**
     * Returns instance of Neuron to handle console commands
     */
    public neuron() {
        return new Neuron(this.fastify, this.appRoot);
    }
}
