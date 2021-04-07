import { FastifyInstance } from "fastify";
import { IocContract } from "../Inverser";

/**
 * Shape of the main application
 */
export interface ApplicationContract {
    /**
     * The actual Fastify instance
     */
    fastify: FastifyInstance;

    /**
     * Absolute path to the application root
     */
    readonly appRoot: string;

    /**
     * Name of application defined inside package.json
     */
    readonly appName: string;

    /**
     * Version of the Orbitcluster application defined inside package.json
     */
    readonly version: SemverNode | null;

    /**
     * Application environment
     */
    readonly environment: AppEnvironments;

    /**
     * A boolean to know if application is running in production mode
     */
    inProduction: boolean;

    /**
     * A boolean to know if application is running in dev mode
     */
    inDev: boolean;

    /**
     * Reference to the IoC container
     */
    container: IocContract;
}

/**
 * Shape of semver node
 */
export type SemverNode = {
    major: number;
    minor: number;
    patch: number;
    prerelease: (string | number)[];
    version: string;
    toString(): string;
}

/**
 * Application environments
 */
export type AppEnvironments = 'web' | 'console' | 'test' | 'unknown';
