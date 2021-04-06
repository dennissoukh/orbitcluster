"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fakes = void 0;
/**
 * Manages the container fakes
 */
class Fakes {
    constructor(container) {
        this.container = container;
        /**
         * Registered fakes
         */
        this.list = new Map();
    }
    /**
     * Register a fake for a given namespace
     */
    register(namespace, callback) {
        this.list.set(namespace, { callback });
        return this;
    }
    /**
     * Find if namespace has a fake registered
     */
    has(namespace) {
        return this.list.has(namespace);
    }
    /**
     * Clear all fakes
     */
    clear() {
        return this.list.clear();
    }
    /**
     * Delete fake for a given namespace
     */
    delete(namespace) {
        return this.list.delete(namespace);
    }
    /**
     * Resolve the fake for a given namespace. An exception is raised if
     * not fake is defined
     */
    resolve(namespace, originalValue) {
        const fake = this.list.get(namespace);
        if (!fake) {
            throw new Error('Missing Fake');
        }
        fake.cachedValue = fake.cachedValue ?? fake.callback(this.container, originalValue);
        return fake.cachedValue;
    }
}
exports.Fakes = Fakes;
