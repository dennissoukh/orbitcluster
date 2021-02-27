const plugin    = require('fastify-mongodb')
const options   = require('../config/database').connections.mongodb

if (!options) {
    throw Error('Could not get MongoDB settings! Terminating...');
}

module.exports = { plugin, options }
