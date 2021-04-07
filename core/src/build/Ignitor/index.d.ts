import { FastifyInstance } from "fastify";
import { Application } from "../Orbitcluster/Application";
import { AppEnvironments } from "../Orbitcluster/Contracts";
import { Neuron } from "./Neuron";
/**
 * Ignitor is used to wireup different pieces of the Orbitcluster application
 * together.
 */
export declare class Ignitor {
    private fastify;
    private appRoot;
    constructor(fastify: FastifyInstance, appRoot: string);
    /**
     * Returns an instance of the application.
     */
    application(environment: AppEnvironments): Application;
    /**
     * Returns instance of Neuron to handle console commands
     */
    neuron(): Neuron;
}
