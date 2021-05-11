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
Object.defineProperty(exports, "__esModule", { value: true });
function parseTLEFile(data, source = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const tles = [];
        const lines = data.split(/\r\n|\n\r|\n|\r/);
        let i = 0;
        while (true) {
            let line = lines[i++];
            if (!line)
                break;
            if (!(line.startsWith('1') || line.startsWith('2'))) {
                const sat = {
                    tle_line0: line.trim(),
                    tle_line1: lines[i++],
                    tle_line2: lines[i++],
                    source,
                };
                tles.push(sat);
            }
        }
        return tles;
    });
}
exports.default = parseTLEFile;
