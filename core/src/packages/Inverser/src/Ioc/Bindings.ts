import { IocContract, BindCallback } from '../Contracts'

/**
 * Manages the IoC container bindings
 */
export class Bindings {
    /**
     * Registered bindings
     */
    private list: Map<
        string,
        {
            callback: BindCallback<any, IocContract>
            cachedValue?: any
            singleton: boolean
        }
    > = new Map()

    constructor(private container: IocContract) { }

    /**
     * Find if namespace is a binding
     */
    public has(namespace: string): boolean {
        return this.list.has(namespace)
    }

    /**
     * Define a binding
     */
    public register(
        binding: string,
        callback: BindCallback<any, IocContract>,
        singleton: boolean
    ): this {
        this.list.set(binding, { callback, singleton })
        return this
    }

    /**
     * Resolve a binding. An exception is raised, if the binding is missing
     */
    public resolve(binding: string) {
        const bindingNode = this.list.get(binding)
        if (!bindingNode) {
            throw new Error('Lookup Failed')
        }

        let resolvedValue: any

        if (bindingNode.singleton) {
            bindingNode.cachedValue = bindingNode.cachedValue ?? bindingNode.callback(this.container)
            resolvedValue = bindingNode.cachedValue
        } else {
            resolvedValue = bindingNode.callback(this.container)
        }

        return resolvedValue
    }
}
