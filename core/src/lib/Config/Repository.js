const Arr = require('../Collections/Array');

const get = (key, value = null) =>
{
    if (typeof key == 'array') {
        return getMany(key);
    }

    return Arr.get(global.appConfig, key, value);
}

const getMany = (keys) =>
{
    // TODO
}

module.exports = {
    get,
    getMany
}
