import { FastifyInstance } from 'fastify';
import { ApplicationContract, SemverNode } from './Contracts';
import { AppEnvironments } from './Contracts';
export declare class Application implements ApplicationContract {
    fastify: FastifyInstance;
    environment: AppEnvironments;
    readonly appRoot: string;
    container: ApplicationContract['container'];
    readonly appName: string;
    readonly version: SemverNode | null;
    inDev: boolean;
    inProduction: boolean;
    constructor(fastify: FastifyInstance, environment: AppEnvironments, appRoot: string);
    private resolveModule;
    private loadAppPackageJson;
    private parseVersion;
}
