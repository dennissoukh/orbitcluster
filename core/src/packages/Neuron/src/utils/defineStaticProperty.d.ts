export declare function defineStaticProperty<Base extends Function, Prop extends keyof Base>(
    self: any, BaseClass: Base, { propertyName, defaultValue, strategy }: {
        propertyName: Prop;
        defaultValue: Base[Prop];
        strategy: 'inherit' | 'define' | ((value: Base[Prop]) => Base[Prop]);
    }
): void;
