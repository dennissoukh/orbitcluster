/**
 * Gets the value of an environment variable.
 */
const env = (key, value = null) => {
    if (process.env[key]) {
        return process.env[key];
    }
    return value;
};

/**
 * Checks if the class method exists.
 */
const method_exists = (obj, method) => {
    if (typeof obj === 'string') {
        return this.window[obj] && typeof this.window[obj][method] === 'function';
    }

    return typeof obj[method] === 'function';
};

module.exports = { env, method_exists };
