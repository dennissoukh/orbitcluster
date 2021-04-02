/**
 * Resolves module from a given directory. It is similar to `require.resolve`
 * but carefully handles the absolute paths.
 */
export declare function resolveFrom(fromLocation: string, modulePath: string): string;
