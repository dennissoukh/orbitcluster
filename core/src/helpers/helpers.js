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
}

module.exports = { env }
