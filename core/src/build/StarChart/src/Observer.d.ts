import { ObserverContract } from "./contracts";
export declare class Observer implements ObserverContract {
    /**
     * Name of the observer location
     */
    name: string;
    /**
     * Latitude of the observer location
     */
    lat: number;
    /**
     * Longitude of the observer location
     */
    lon: number;
    /**
     * Altitude of the observer location
     */
    alt: number;
    constructor(name: string, lat: number, lon: number, alt: number);
}
