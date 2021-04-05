Object.defineProperty(exports, '__esModule', { value: true });
exports.Bindings = void 0;
/**
 * Manages the IoC container bindings
 */
class Bindings {
    constructor(container) {
        this.container = container;
        /**
         * Registered bindings
         */
        this.list = new Map();
    }
    /**
     * Find if namespace is a binding
     */
    has(namespace) {
        return this.list.has(namespace);
    }
    /**
     * Define a binding
     */
    register(binding, callback, singleton) {
        this.list.set(binding, { callback, singleton });
        return this;
    }
    /**
     * Resolve a binding. An exception is raised, if the binding is missing
     */
    resolve(binding) {
        const bindingNode = this.list.get(binding);
        if (!bindingNode) {
            throw new Error('Lookup Failed');
        }
        let resolvedValue;
        if (bindingNode.singleton) {
            bindingNode.cachedValue = bindingNode.cachedValue ?? bindingNode.callback(this.container);
            resolvedValue = bindingNode.cachedValue;
        } else {
            resolvedValue = bindingNode.callback(this.container);
        }
        return resolvedValue;
    }
}
exports.Bindings = Bindings;
