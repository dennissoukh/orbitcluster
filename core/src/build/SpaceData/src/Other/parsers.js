"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseSatlist = void 0;
async function ParseSatlist(data) {
    let res = [];
    data.forEach((sat) => {
        const data = sat[0].split(';');
        if (data.length === 8) {
            const satObject = {
                satname: data[0],
                norad_cat_id: data[1] ? Number.parseInt(data[1]) : null,
                uplink: data[2] ? data[2].trim() : null,
                downlink: data[3] ? data[3].trim() : null,
                beacon: data[4] ? data[4].trim() : null,
                mode: data[5] ? data[5].trim() : null,
                callsign: data[6] ? data[6].trim() : null,
                type: data[7] ? data[7] : null,
            };
            res.push(satObject);
        }
    });
    console.log(res);
}
exports.ParseSatlist = ParseSatlist;
