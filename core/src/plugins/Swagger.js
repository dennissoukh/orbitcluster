const plugin = require('fastify-swagger');
const options = require('../config/swagger');

module.exports = { plugin, options: options.options };
