export interface Satlist {
    satname: string;
    norad_cat_id: number | null;
    uplink: string | null;
    downlink: string | null;
    beacon: string | null;
    mode: string | null;
    callsign: string | null;
    type: string | null;
}
export interface Mcnames {
    norad_cat_id: number;
    satname: string;
    length: number | null;
    width: number | null;
    depth: number | null;
    magnitude: number | null;
    magnitude_source: string | null;
    rcs: number | null;
}
