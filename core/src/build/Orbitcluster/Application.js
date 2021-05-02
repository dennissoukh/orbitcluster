"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Inverser_1 = require("../Inverser");
const helpers = __importStar(require("../Cosmic"));
const semver_1 = require("semver");
class Application {
    constructor(fastify, environment, appRoot) {
        this.fastify = fastify;
        this.environment = environment;
        this.appRoot = appRoot;
        this.container = new Inverser_1.Ioc();
        this.inDev = true;
        this.inProduction = true;
        const pkgFile = this.loadAppPackageJson();
        this.appName = pkgFile.name;
        this.version = this.parseVersion(pkgFile.version);
    }
    ;
    resolveModule(modulePath, onMissingCallback) {
        let filePath;
        try {
            filePath = helpers.resolveFrom(this.appRoot, modulePath);
            return require(filePath);
        }
        catch (error) {
            if (['ENOENT', 'MODULE_NOT_FOUND'].includes(error.code) &&
                (!filePath || filePath === error.path)) {
                return onMissingCallback(error);
            }
            else {
                throw error;
            }
        }
    }
    loadAppPackageJson() {
        const pkgFile = this.resolveModule('./package.json', () => {
            return {};
        });
        return {
            name: pkgFile.name || 'orbitcluster-app',
            version: pkgFile.version || '0.0.0',
        };
    }
    parseVersion(version) {
        const parsed = semver_1.parse(version);
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
                return this.version;
            }
        };
    }
}
exports.Application = Application;
