const Command = require('../../packages/Console/Command');

class DownloadSatcat extends Command {
    /**
     * The name and signature of the console command.
     *
     * @member {string}
     */
    signature = 'download:satcat';

    /**
     * The console command description.
     *
     * @member {string}
     */
    description = 'Download the Space-Track satellite catalog.';

    /**
     * Execute the console command.
     */
    handle = (app) => {
        //
    }
}

module.exports = new DownloadSatcat();
