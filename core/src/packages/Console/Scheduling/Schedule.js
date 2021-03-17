const Event = require('./Event');

class Schedule {
    events = [];

    /**
     * Add a new command event to the schedule.
     *
     * @param {string} command
     * @returns
     */
    command = (command) => {
        const event = new Event(command);

        // Only push event if it doesn't exist in the scheduler
        if (!this.events.find((e) => { return e.command === event.command; })) {
            this.events.push(event);
        }

        return event;
    }
}

module.exports = new Schedule();
