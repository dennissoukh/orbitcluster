"use strict";
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
exports.IocResolver = void 0;
/**
 * Exposes the API to resolve and call bindings from the IoC container. The resolver
 * internally caches the IoC container lookup nodes to boost performance.
 */
class IocResolver {
    constructor(container, fallbackMethod, rcNamespaceKey, fallbackNamespace) {
        this.container = container;
        this.fallbackMethod = fallbackMethod;
        this.rcNamespaceKey = rcNamespaceKey;
        this.fallbackNamespace = fallbackNamespace;
        this.lookupCache = {};
        /**
         * The namespace that will be used as a prefix when resolving
         * bindings
         */
        this.prefixNamespace = this.getPrefixNamespace();
    }
    /**
     * Returns the prefix namespace by giving preference to the
     * `.adonisrc.json` file
     */
    getPrefixNamespace() {
        /**
         * Use fallback namespace, when lookup inside rcFile is not required
         */
        if (!this.rcNamespaceKey) {
            return this.fallbackNamespace;
        }
        /**
         * If container doesn't have `Application` binding, then there is no
         * way for us to read rcFile namespaces and hence we use the fallback
         * namespace
         */
        if (!this.container.hasBinding('Adonis/Core/Application')) {
            return this.fallbackNamespace;
        }
        /**
         * Attempt to resolve the rcNamespace key from the rcFile
         * For example: The rc file has following namespaces
         * {
         *   "controllers": "App/Controllers/Http"
         * }
         * We will use the value next to the `controllers` key
         */
        const application = this.container.use('Adonis/Core/Application');
        return application.namespacesMap.get(this.rcNamespaceKey) || this.fallbackNamespace;
    }
    /**
     * Resolves the namespace and returns it's lookup node
     */
    resolve(namespace, prefixNamespace = this.prefixNamespace) {
        const cacheKey = prefixNamespace ? `${prefixNamespace}/${namespace}` : namespace;
        /**
         * Return from cache, when the node exists
         */
        const cacheNode = this.lookupCache[cacheKey];
        if (cacheNode) {
            return cacheNode;
        }
        let method = this.fallbackMethod || 'handle';
        /**
         * Split the namespace to lookup the method on it. If method isn't
         * defined, we will use the conventional `handle` method.
         */
        const tokens = namespace.split('.');
        if (tokens.length > 1) {
            method = tokens.pop();
        }
        const lookupNode = this.container.lookupOrFail(tokens.join('.'), prefixNamespace);
        this.lookupCache[cacheKey] = Object.assign(Object.assign({}, lookupNode), { method });
        return this.lookupCache[cacheKey];
    }
    /**
     * Calls the namespace.method expression with any arguments that needs to
     * be passed. Also supports type-hinting dependencies.
     */
    call(namespace, prefixNamespace, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const lookupNode = typeof namespace === 'string' ? this.resolve(namespace, prefixNamespace) : namespace;
            return this.container.callAsync(yield this.container.makeAsync(lookupNode.namespace), lookupNode.method, args);
        });
    }
}
exports.IocResolver = IocResolver;
