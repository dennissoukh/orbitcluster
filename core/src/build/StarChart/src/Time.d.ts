import { TimeContract } from './Contracts';
export declare class Time implements TimeContract {
    /**
     * Date for which the star chart will be rendered
     */
    date: Date;
    /**
     * Timezone
     */
    tz: number;
    /**
     * Timezone string
     */
    tzStr: string;
    /**
     * Year
     */
    yyyy: number;
    /**
     * Month
     */
    mm: number;
    /**
     * Day
     */
    dd: number;
    /**
     * Hour
     */
    h: number;
    /**
     * Minute
     */
    m: number;
    /**
     * Second
     */
    s: number;
    /**
     * Number of days from J2000
     */
    D: number;
    /**
     * D / 36525
     */
    T: number;
    /**
     * Delta T
     */
    dT: number;
    /**
     * Greenwich Mean Sidereal Time
     */
    GMST: number;
    /**
     * Local Sidereal Time
     */
    LST: number;
    /**
     * Local Sidereal Time in radians
     */
    LSTrad: number;
    /**
     * Local Sidereal Time string
     */
    LSTStr: string;
    /**
     * Timestamp string
     */
    timeStr: string;
    /**
     * Date string
     */
    dateStr: string;
    /**
     * Latitude
     */
    lat: number;
    /**
     * Longitude
     */
    lon: number;
    constructor(date: Date, lat: number, lon: number);
    /**
     * Compute the timezone from the timestamp
     */
    setTimezone(): void;
    /**
     * Compute the number of days from J2000 epoch
     */
    setD(): number;
    /**
     * Set Delta T. See: http://eclipsewise.com/help/deltatpoly2014.html
     */
    setDeltaT(): number;
    setDateStrings(): void;
    setDateStringsNegativeJD(jd: number): void;
    generateDateString(yyyy: number, mm: number, dd: number): string;
    generateTimeString(h: number, m: number, s: number): string;
    /**
     * Calculate the mean Greenwich sidereal time in hours
     */
    setGMST(): void;
    /**
     * Calculate sidereal time from GMST and longitude
     */
    setSidereal(GMST: number, lon: number): void;
}
