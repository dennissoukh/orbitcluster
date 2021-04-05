Object.defineProperty(exports, '__esModule', { value: true });
exports.IocProxyClass = exports.IocProxyObject = void 0;
/**
 * Checks for the existence of fake on the target
 */
function hasFake(target) {
    return target.options.has(target.namespace);
}
/**
 * Calls the trap on the target
 */
function callTrap(target, trap, ...args) {
    if (hasFake(target)) {
        return Reflect[trap](target.options.resolve(target.namespace, target.value), ...args);
    }

    return Reflect[trap](target.value, ...args);
}
/**
 * Proxy handler to handle objects
 */
const objectHandler = {
    get(target, ...args) {
        return callTrap(target, 'get', ...args);
    },
    apply(target, ...args) {
        return callTrap(target, 'apply', ...args);
    },
    defineProperty(target, ...args) {
        return callTrap(target, 'defineProperty', ...args);
    },
    deleteProperty(target, ...args) {
        return callTrap(target, 'deleteProperty', ...args);
    },
    getOwnPropertyDescriptor(target, ...args) {
        return callTrap(target, 'getOwnPropertyDescriptor', ...args);
    },
    getPrototypeOf(target, ...args) {
        return callTrap(target, 'getPrototypeOf', ...args);
    },
    has(target, ...args) {
        return callTrap(target, 'has', ...args);
    },
    isExtensible(target, ...args) {
        return callTrap(target, 'isExtensible', ...args);
    },
    ownKeys(target, ...args) {
        return callTrap(target, 'ownKeys', ...args);
    },
    preventExtensions() {
        throw new Error('Cannot prevent extensions during a fake');
    },
    set(target, ...args) {
        return callTrap(target, 'set', ...args);
    },
    setPrototypeOf(target, ...args) {
        return callTrap(target, 'setPrototypeOf', ...args);
    },
};
/**
 * Proxy handler to handle classes and functions
 */
const classHandler = {
    ...objectHandler,
    construct(target, ...args) {
        return callTrap(target, 'construct', ...args);
    },
};
/**
 * Proxies the objects to fallback to fake, when it exists.
 */
class IocProxyObject {
    constructor(namespace, value, options) {
        this.namespace = namespace;
        this.value = value;
        this.options = options;
        return new Proxy(this, objectHandler);
    }
}
exports.IocProxyObject = IocProxyObject;
/**
 * Proxies the class constructor to fallback to fake, when it exists.
 */
function IocProxyClass(namespace, value, options) {
    function Wrapped() { }
    Wrapped.namespace = namespace;
    Wrapped.value = value;
    Wrapped.options = options;
    return new Proxy(Wrapped, classHandler);
}
exports.IocProxyClass = IocProxyClass;
