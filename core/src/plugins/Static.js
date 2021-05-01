const plugin = require('fastify-static');
const options = require('../config/app');

const staticOptions = {
    root: options.root,
    prefix: options.asset_url,
}

module.exports = { plugin, options: staticOptions };
