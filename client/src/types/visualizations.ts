import { tle } from "./satellite";

export type satellite = {
    name: string,
    active_tle: tle,
    tles: Array<tle>,
}
