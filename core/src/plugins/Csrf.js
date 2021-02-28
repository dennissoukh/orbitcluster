const plugin    = require('fastify-csrf')
const options   = { cookieOpts: { signed: true } }

module.exports = { plugin, options }
