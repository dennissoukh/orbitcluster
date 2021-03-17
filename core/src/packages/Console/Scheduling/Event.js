const ManagesFrequencies = require('./ManagesFrequencies');

class Event extends ManagesFrequencies {
    command;
    expression = '* * * * *';
    timezone = 'UTC';

    constructor(command, timezone = null) {
        super();
        this.command = command;
        this.timezone = timezone;
    }
}

module.exports = Event;
