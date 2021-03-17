require('../../../helpers/Str');

class ManagesFrequencies {
    SUNDAY = 0;
    MONDAY = 1;
    TUESDAY = 2;
    WEDNESDAY = 3;
    THURSDAY = 4;
    FRIDAY = 5;
    SATURDAY = 6;

    cron = (expression) => {
        this.expression = expression;

        return this;
    }

    everyMinute = () => {
        return this.spliceIntoPosition(1, '*');
    }

    everyTwoMinutes = () => {
        return this.spliceIntoPosition(1, '*/2');
    }

    everyThreeMinutes = () => {
        return this.spliceIntoPosition(1, '*/3');
    }

    everyFourMinutes = () => {
        return this.spliceIntoPosition(1, '*/4');
    }

    everyFiveMinutes = () => {
        return this.spliceIntoPosition(1, '*/5');
    }

    everyTenMinutes = () => {
        return this.spliceIntoPosition(1, '*/10');
    }

    everyFifteenMinutes = () => {
        return this.spliceIntoPosition(1, '*/15');
    }

    everyThirtyMinutes = () => {
        return this.spliceIntoPosition(1, '*/30');
    }

    hourly = () => {
        return this.spliceIntoPosition(1, 0);
    }

    hourlyAt = (offset) => {
        const minutes = Array.isArray(offset) ? offset : [offset];

        return this.spliceIntoPosition(1, minutes);
    }

    everyTwoHours = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, '*/2');
    }

    everyThreeHours = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, '*/3');
    }

    everyFourHours = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, '*/4');
    }

    everySixHours = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, '*/6');
    }

    daily = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0);
    }

    at = (time) => {
        return this.dailyAt(time);
    }

    dailyAt = (time) => {
        const segments = time.explode(':');

        return this.spliceIntoPosition(2, segments[0])
            .spliceIntoPosition(1, segments.length === 2 ? segments[1] : '0');
    }

    twiceDaily = (first = 1, second = 13) => {
        const hours = `${first},${second}`;

        return this.spliceIntoPosition(1, 0).spliceIntoPosition(2, hours);
    }

    weekdays = () => {
        return this.days(`${this.MONDAY}-${this.FRIDAY}`);
    }

    weekends = () => {
        return this.days(`${this.SATURDAY},${this.SUNDAY}`);
    }

    mondays = () => {
        return this.days(`${this.MONDAY}`);
    }

    tuesdays = () => {
        return this.days(`${this.MONDAY}`);
    }

    wednesdays = () => {
        return this.days(`${this.WEDNESDAY}`);
    }

    thursdays = () => {
        return this.days(`${this.THURSDAY}`);
    }

    fridays = () => {
        return this.days(`${this.FRIDAY}`);
    }

    saturdays = () => {
        return this.days(`${this.SATURDAY}`);
    }

    sundays = () => {
        return this.days(`${this.SUNDAY}`);
    }

    weekly = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(5, 0);
    }

    weeklyOn = (dayOfWeek, time = '0:0') => {
        this.dailyAt(time);

        return this.days(dayOfWeek);
    }

    monthly = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, 1);
    }

    monthlyOn = (dayOfMonth = 1, time = '0:0') => {
        this.dailyAt(time);

        return this.spliceIntoPosition(3, dayOfMonth);
    }

    twiceMonthly = (first = 1, second = 16, time = '0:0') => {
        const daysOfMonth = `${first},${second}`;

        this.dailyAt(time);

        this.spliceIntoPosition(3, daysOfMonth);
    }

    lastDayOfMonth = (time = '0:0') => {
        this.dailyAt(time);

        return this.spliceIntoPosition(3, Date.now().endOfMonth().getDay());
    }

    quarterly = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, 1)
            .spliceIntoPosition(4, '1-12/3');
    }

    yearly = () => {
        return this.spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 0)
            .spliceIntoPosition(3, 1)
            .spliceIntoPosition(4, 1);
    }

    yearlyOn = (month = 1, dayOfMonth = 1, time = '0:0') => {
        this.dailyAt(time);

        return this.spliceIntoPosition(3, dayOfMonth)
            .spliceIntoPosition(4, month);
    }

    days = (days) => {
        const daysAmount = Array.isArray(days) ? days : [days];

        return this.spliceIntoPosition(5, daysAmount);
    }

    spliceIntoPosition = (position, value) => {
        const segments = this.expression.explode(' ');

        segments[position - 1] = value;

        return this.cron(segments.join(' '));
    }
}

module.exports = ManagesFrequencies;
