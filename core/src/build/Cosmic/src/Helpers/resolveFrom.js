const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.resolveFrom = void 0;
const path_1 = require('path');
const resolve_from_1 = __importDefault(require('resolve-from'));
/**
 * Resolves module from a given directory. It is similar to `require.resolve`
 * but carefully handles the absolute paths.
 */
function resolveFrom(fromLocation, modulePath) {
    if (path_1.isAbsolute(modulePath)) {
        return modulePath;
    }
    return resolve_from_1.default(fromLocation, modulePath);
}
exports.resolveFrom = resolveFrom;
