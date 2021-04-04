import { ObserverContract } from "./contracts";

export class Observer implements ObserverContract {
    /**
     * Name of the observer location
     */
    public name: string;

    /**
     * Latitude of the observer location
     */
    public lat: number;

    /**
     * Longitude of the observer location
     */
    public lon: number;

    /**
     * Altitude of the observer location
     */
    public alt: number;

    constructor(name: string, lat: number, lon: number, alt: number) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.alt= alt;
    }
}
