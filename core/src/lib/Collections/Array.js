/**
 * Determine whether the given value is array or object accessible.
 */
const accessible = (value) =>
{
    return typeof value == 'object' || typeof value == 'array';
}

/**
 * Determine if the given key exists in the provided array or object.
 */
const exists = (array, segment) =>
{
    return segment in array;
}

/**
 * Get an item from an array or object using "dot" notation.
 */
const get = (array, key, value = null) =>
{
    if (!key) {
        return array;
    }

    if (exists(array, key)) {
        return array[key];
    }

    if (!key.includes('.')) {
        return array[key] || value;
    }

    key.split('.').forEach(segment => {
        if (accessible(array) && exists(array, segment)) {
            array = array[segment];
        } else {
            return value;
        }
    });

    return array;
}

module.exports = {
    accessible,
    exists,
    get
};
