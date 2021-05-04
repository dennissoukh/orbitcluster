const DAY = 86400000;
const HALF_DAY = DAY / 2;
const UNIX_EPOCH_JULIAN_DATE = 2440587.5;
const UNIX_EPOCH_JULIAN_DAY = 2440587;

export const convert = (date: number) => {
    return (toJulianDay(date) + (toMillisecondsInJulianDay(date) / DAY)).toFixed(6);
}

export const convertToDate = (julian: number) => {
    return new Date((Number(julian) - UNIX_EPOCH_JULIAN_DATE) * DAY);
}

export const toJulianDay = (date: number) => {
    return ~~((+date + HALF_DAY) / DAY) + UNIX_EPOCH_JULIAN_DAY;
}

export const toMillisecondsInJulianDay = (date: number) => {
    return (+date + HALF_DAY) % DAY;
}

export const fromJulianDayAndMilliseconds = (day: number, ms: number) => {
    return (day - UNIX_EPOCH_JULIAN_DATE) * DAY + ms;
}
