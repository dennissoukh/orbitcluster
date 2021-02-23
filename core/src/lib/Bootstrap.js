/*
|--------------------------------------------------------------------------
| Bootstrap the 'Korolev' library
|--------------------------------------------------------------------------
|
| In order, we'll load the following:
| 1. Helpers
|
*/

// Create helper functions
const helpers   = require('./helpers');
global.env      = helpers.env;
global.config   = helpers.config;

// Demonstrate how a global function would work
global.inspire  = require('./Foundation/Inspiring');
