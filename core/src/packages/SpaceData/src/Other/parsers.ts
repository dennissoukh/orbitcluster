import parseTLEFile from "../helpers/parseTleFile";
import { Mcnames, Satlist } from "./contracts";

/**
 * Process satlist.csv
 */
export async function ParseSatlist(data: any) {
    let res: Satlist[] = [];

    data.forEach((sat: Array<string>) => {
        const data = sat[0].split(';');

        if (data.length === 8) {
            const satObject = {
                satname:        data[0],
                norad_cat_id:   data[1] ? Number.parseInt(data[1]) : null,
                uplink:         data[2] ? data[2].trim() : null,
                downlink:       data[3] ? data[3].trim() : null,
                beacon:         data[4] ? data[4].trim() : null,
                mode:           data[5] ? data[5].trim() : null,
                callsign:       data[6] ? data[6].trim() : null,
                type:           data[7] ? data[7] : null,
            }

            res.push(satObject);
        }
    });

    return res;
}

/**
 * Process mcnames.zip
 */
export async function ParseMcnames(data: any) {
    let res: Mcnames[] = [];
    const split = data.split(/\r\n|\n\r|\n|\r/);

    split.forEach((sat: string) => {
        const satObject = {
            norad_cat_id:       Number.parseInt(sat.slice(0, 5)),
            satname:            sat.slice(6, 20).trim(),
            length:             sat.slice(22, 26) ? Number.parseFloat(sat.slice(22, 26)) : null,
            width:              sat.slice(28, 31) ? Number.parseFloat(sat.slice(28, 31)) : null,
            depth:              sat.slice(33, 36) ? Number.parseFloat(sat.slice(33, 36)) : null,
            magnitude:          sat.slice(37, 41) ? Number.parseFloat(sat.slice(37, 41)) : null,
            magnitude_source:   sat.slice(42, 43) ? sat.slice(42, 43) : null,
            rcs:                sat.slice(44, 48) ? Number.parseFloat(sat.slice(44, 48)) : null,
        }

        res.push(satObject);
    });

    return res;
}

export async function ParseClassfd(data: string) {
    return await parseTLEFile(data);
}

export async function ParseAmsat(data: string) {
    return await parseTLEFile(data);
}

export async function ParseHamsat(data: string) {
    return await parseTLEFile(data);
}
