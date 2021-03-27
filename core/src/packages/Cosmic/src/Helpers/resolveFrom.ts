import { isAbsolute } from 'path';
import resolveFromMain from 'resolve-from';

/**
 * Resolves module from a given directory. It is similar to `require.resolve`
 * but carefully handles the absolute paths.
 */
export function resolveFrom(fromLocation: string, modulePath: string) {
    if (isAbsolute(modulePath)) {
        return modulePath;
    }

    return resolveFromMain(fromLocation, modulePath);
}

