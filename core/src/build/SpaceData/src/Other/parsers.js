"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCelestrak = exports.ParseHamsat = exports.ParseAmsat = exports.ParseClassfd = exports.ParseMcnames = exports.ParseSatlist = void 0;
const parseTLEFile_1 = __importDefault(require("../helpers/parseTLEFile"));
/**
 * Process satlist.csv
 */
function ParseSatlist(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.ParseSatlist = ParseSatlist;
/**
 * Process mcnames.zip
 */
function ParseMcnames(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.ParseMcnames = ParseMcnames;
function ParseClassfd(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield parseTLEFile_1.default(data, 'McCants');
    });
}
exports.ParseClassfd = ParseClassfd;
function ParseAmsat(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield parseTLEFile_1.default(data, 'AMSAT');
    });
}
exports.ParseAmsat = ParseAmsat;
function ParseHamsat(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield parseTLEFile_1.default(data, 'Hamsat');
    });
}
exports.ParseHamsat = ParseHamsat;
function ParseCelestrak(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield parseTLEFile_1.default(data, 'CelesTrak');
    });
}
exports.ParseCelestrak = ParseCelestrak;
