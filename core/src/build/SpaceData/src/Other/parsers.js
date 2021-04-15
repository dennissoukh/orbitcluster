"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCelestrak = exports.ParseHamsat = exports.ParseAmsat = exports.ParseClassfd = exports.ParseMcnames = exports.ParseSatlist = void 0;
const parseTleFile_1 = __importDefault(require("../helpers/parseTleFile"));
/**
 * Process satlist.csv
 */
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
    return res;
}
exports.ParseSatlist = ParseSatlist;
/**
 * Process mcnames.zip
 */
async function ParseMcnames(data) {
    let res = [];
    const split = data.split(/\r\n|\n\r|\n|\r/);
    split.forEach((sat) => {
        const satObject = {
            norad_cat_id: Number.parseInt(sat.slice(0, 5)),
            satname: sat.slice(6, 20).trim(),
            length: sat.slice(22, 26) ? Number.parseFloat(sat.slice(22, 26)) : null,
            width: sat.slice(28, 31) ? Number.parseFloat(sat.slice(28, 31)) : null,
            depth: sat.slice(33, 36) ? Number.parseFloat(sat.slice(33, 36)) : null,
            magnitude: sat.slice(37, 41) ? Number.parseFloat(sat.slice(37, 41)) : null,
            magnitude_source: sat.slice(42, 43) ? sat.slice(42, 43) : null,
            rcs: sat.slice(44, 48) ? Number.parseFloat(sat.slice(44, 48)) : null,
        };
        res.push(satObject);
    });
    return res;
}
exports.ParseMcnames = ParseMcnames;
async function ParseClassfd(data) {
    return await parseTleFile_1.default(data, 'McCants');
}
exports.ParseClassfd = ParseClassfd;
async function ParseAmsat(data) {
    return await parseTleFile_1.default(data, 'AMSAT');
}
exports.ParseAmsat = ParseAmsat;
async function ParseHamsat(data) {
    return await parseTleFile_1.default(data, 'Hamsat');
}
exports.ParseHamsat = ParseHamsat;
async function ParseCelestrak(data) {
    return await parseTleFile_1.default(data, 'CelesTrak');
}
exports.ParseCelestrak = ParseCelestrak;
