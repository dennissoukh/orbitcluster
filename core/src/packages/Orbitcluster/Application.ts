import { FastifyInstance } from 'fastify';
import { Ioc } from '../Inverser';
import { ApplicationContract, SemverNode } from './Contracts';
import { AppEnvironments } from './Contracts';
import * as helpers from '../Cosmic';
import { parse as semverParse } from 'semver';

export class Application implements ApplicationContract {
    public container: ApplicationContract['container'] = new Ioc();

    public readonly appName: string;

    public readonly version: SemverNode | null;

    public inDev: boolean = true;

    public inProduction: boolean = true;

    constructor(
        public fastify: FastifyInstance,
        public environment: AppEnvironments,
        public readonly appRoot: string
    ) {
        const pkgFile = this.loadAppPackageJson();

        this.appName = pkgFile.name;
        this.version = this.parseVersion(pkgFile.version);
    };

    private resolveModule(modulePath: string, onMissingCallback: (error: any) => void) {
        let filePath: string | undefined;

        try {
            filePath = helpers.resolveFrom(this.appRoot, modulePath);
            return require(filePath);
        } catch (error) {
            if (
                ['ENOENT', 'MODULE_NOT_FOUND'].includes(error.code) &&
                (!filePath || filePath === error.path)
            ) {
                return onMissingCallback(error);
            } else {
                throw error;
            }
        }
    }

    private loadAppPackageJson(): {
        name: string
        engines?: { node?: string }
        version: string
    } {
        const pkgFile = this.resolveModule('./package.json', () => {
            return {};
        });

        return {
            name: pkgFile.name || 'orbitcluster-app',
            version: pkgFile.version || '0.0.0',
        }
    }

    private parseVersion(version: string): SemverNode | null {
        const parsed = semverParse(version);

        if (!parsed) {
            return null;
        }

        return {
            major: parsed.major,
            minor: parsed.minor,
            patch: parsed.patch,
            prerelease: parsed.prerelease.map((release) => release),
            version: parsed.version,
            toString() {
                return this.version
            }
        }
    }
}
