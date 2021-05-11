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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportAliases = void 0;
const path_1 = require("path");
/**
 * Manages the import aliases
 */
class ImportAliases {
    constructor(container) {
        this.container = container;
        /**
         * Registered aliases
         */
        this.list = {};
        /**
         * In-memory require cache to speed up lookup calls. Yes, "require"
         * is slow. Check "perf/require.js"
         */
        this.requireCache = new Map();
    }
    /**
     * Returns the matching alias for the given namespace
     */
    getPathAlias(namespace) {
        return Object.keys(this.list).find((alias) => {
            return namespace.startsWith(`${alias}/`);
        });
    }
    /**
     * Returns path for a given alias
     */
    makeAliasPath(namespace, alias) {
        return path_1.normalize(namespace.replace(alias, this.list[alias]));
    }
    /**
     * Register an import alias
     */
    register(absolutePath, alias) {
        this.list[alias] = absolutePath;
        return this;
    }
    /**
     * Find if a namespace is part of the import aliases
     */
    has(namespace) {
        return !!this.getPathAlias(namespace);
    }
    /**
     * Import the namespace from the registered import aliases.
     */
    resolve(namespace) {
        const alias = this.getPathAlias(namespace);
        if (!alias) {
            throw new Error('Lookup Failed');
        }
        const cacheItem = this.requireCache.get(namespace);
        if (cacheItem) {
            return cacheItem.value;
        }
        /**
         * Absolute path to the module
         */
        const diskPath = this.makeAliasPath(namespace, alias);
        /**
         * Require the module
         */
        const value = require(diskPath);
        /**
         * Cache the output
         */
        this.requireCache.set(namespace, { diskPath, value });
        /**
         * Return the value
         */
        return value;
    }
    /**
     * Same as [[resolve]] but uses ES modules
     */
    resolveAsync(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Piggy back on resolve when using cjs module system
             */
            if (this.container.module === 'cjs') {
                return this.resolve(namespace);
            }
            const alias = this.getPathAlias(namespace);
            if (!alias) {
                throw new Error('lookup failed');
            }
            /**
             * Import the module. The following code will only compile to esm
             * when the output of this build is esm
             */
            return Promise.resolve().then(() => __importStar(require(this.makeAliasPath(namespace, alias))));
        });
    }
}
exports.ImportAliases = ImportAliases;
