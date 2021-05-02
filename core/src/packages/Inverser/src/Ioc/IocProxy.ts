import type { Fakes } from './Fakes'

/**
 * Checks for the existence of fake on the target
 */
function hasFake(target: { options: Fakes; namespace: string; value: any }) {
    return target.options.has(target.namespace)
}

/**
 * Calls the trap on the target
 */
function callTrap(
    target: { options: Fakes; namespace: string; value: any },
    trap: any,
    ...args: any[]
) {
    if (hasFake(target)) {
        return Reflect[trap](target.options.resolve(target.namespace, target.value), ...args)
    } else {
        return Reflect[trap](target.value, ...args)
    }
}

/**
 * Proxy handler to handle objects
 */
const objectHandler = {
    get(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'get', ...args)
    },

    apply(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'apply', ...args)
    },

    defineProperty(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'defineProperty', ...args)
    },

    deleteProperty(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'deleteProperty', ...args)
    },

    getOwnPropertyDescriptor(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'getOwnPropertyDescriptor', ...args)
    },

    getPrototypeOf(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'getPrototypeOf', ...args)
    },

    has(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'has', ...args)
    },

    isExtensible(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'isExtensible', ...args)
    },

    ownKeys(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'ownKeys', ...args)
    },

    preventExtensions() {
        throw new Error('Cannot prevent extensions during a fake')
    },

    set(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'set', ...args)
    },

    setPrototypeOf(target: IocProxyObject, ...args: any[]) {
        return callTrap(target, 'setPrototypeOf', ...args)
    },
}

/**
 * Proxy handler to handle classes and functions
 */
const classHandler = Object.assign({}, objectHandler, {
    construct(target: { options: Fakes; namespace: string; value: any }, ...args: any[]) {
        return callTrap(target, 'construct', ...args)
    },
})

/**
 * Proxies the objects to fallback to fake, when it exists.
 */
export class IocProxyObject {
    constructor(public namespace: string, public value: any, public options: Fakes) {
        return new Proxy(this, objectHandler)
    }
}

/**
 * Proxies the class constructor to fallback to fake, when it exists.
 */
export function IocProxyClass(namespace: string, value: any, options: Fakes) {
    function Wrapped() { }
    Wrapped.namespace = namespace
    Wrapped.value = value
    Wrapped.options = options

    return new Proxy(Wrapped, classHandler)
}
