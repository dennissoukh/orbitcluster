import { FastifyInstance } from 'fastify';
import { IocContract } from '../../../Inverser/src/Contracts';

/**
 * Shape of semver node
 */
export type SemverNode = {
    major: number;
    minor: number;
    patch: number;
    prerelease: (string | number)[];
    version: string;
    toString: string;
}

/**
 * Application environments
 */
export type AppEnvironments = 'web' | 'console' | 'unknown';

export type SerializedCommand = {
    commandName: string;
    description: string;
}

/**
 * Shape of Fastify application
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
 * Shape of Neuron kernel
 */
export interface KernelContract {
    /**
     * The exit code to be used for exiting the process
     */
    exitCode?: number;

    /**
     * Reference to the process error
     */
    error?: Error;

    /**
     * Reference to the default command
     */
    defaultCommand: CommandConstructorContract;

    /**
     * Print help for all commands or a given command
     */
    printHelp(): void;

    /**
     * Register an on exit callback listener. It should always
     * exit the process
     */
    onExit(callback: (kernel: this) => void | Promise<void>): this;

    /**
     * Print help for all commands or a given command
     */
    printHelp(command?: CommandConstructorContract): void;

    /**
     * Trigger exit flow
     */
    exit(command: CommandContract, error?: any): Promise<void>;
}

/**
 * Shape of command class
 */
export interface CommandContract {
    exitCode?: number;
    kernel: KernelContract;

    onExit(callback: () => Promise<void> | void): this;
    exit(): Promise<void>;

    exec(): Promise<any>;
    handle?(...args: any[]): Promise<any>;
    run?(...args: any[]): Promise<any>;
    prepare?(...args: any[]): Promise<any>;
    completed?(...args: any[]): Promise<any>;
}

/**
 * Shape of command constructor with its static properties
 */
export interface CommandConstructorContract extends SerializedCommand {
    new (application: ApplicationContract, kernel: KernelContract, ...args: any[]): CommandContract;

    /**
     * A boolean to know if the command has been booted or not
     */
    booted: boolean;

    /**
     * Boot the command
     */
    boot(): void;
}
