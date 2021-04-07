"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIsFunction = exports.isPrimtiveConstructor = exports.isEsm = void 0;
/**
 * Returns a boolean telling if value is an esm module
 * with `export default`.
 */
function isEsm(value) {
    return value && value.__esModule;
}
exports.isEsm = isEsm;
/**
 * Returns a boolean telling if value is a primitive or object constructor.
 */
function isPrimtiveConstructor(value) {
    return [String, Function, Object, Date, Number, Boolean].indexOf(value) > -1;
}
exports.isPrimtiveConstructor = isPrimtiveConstructor;
/**
 * Raises error with a message when callback is not
 * a function.
 */
function ensureIsFunction(callback, message) {
    if (typeof callback !== 'function') {
        throw new Error('E_RUNTIME_EXCEPTION' + message);
    }
}
exports.ensureIsFunction = ensureIsFunction;
