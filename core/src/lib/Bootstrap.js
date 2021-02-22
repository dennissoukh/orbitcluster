/*
|--------------------------------------------------------------------------
| Bootstrap the 'Korolev' library
|--------------------------------------------------------------------------
|
| In order, we'll load the following:
| 1. Helpers
|
*/

const VERSION   = '1.0.0';

// Create helper functions
const helpers   = require('./helpers');
global.env      = helpers.env;
global.config   = helpers.config;

const inspire   = require('./Foundation/Inspiring');

module.exports = {
    inspire
}
