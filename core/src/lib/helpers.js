const Repository = require('./Config/Repository');

/**
 * Gets the value of an environment variable.
 */
const env = (key, value = null) =>
{
    if (process.env[key]) {
        return process.env[key];
    } else {
        return value;
    }
};

/**
 * Get / set the specified configuration value.
 * TODO: If an array is passed as the key, assume you want to set an array of values.
 */
const config = (key = null, value = null) =>
{
    if (!key) {
        return global.app_config;
    }

    if (Array.isArray(key)) {
        return;
    }

    return Repository.get(key, value);
}

module.exports = {
    env,
    config
}
