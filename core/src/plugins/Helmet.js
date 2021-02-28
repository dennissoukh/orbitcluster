const plugin    = require('fastify-helmet')
const options   = require('../config/helmet')

/**
 * Helmet does not support 'true' as a middleware option, so we remove the
 * properties that value 'true' in the options.
 */
Object.keys(options).forEach(key => {
    if (options[key] == true || options[key] == 'true'){
        delete options[key];
    }
})

module.exports = { plugin, options }
