/**
 * @orbitcluster/SpaceData - Data package for the Orbitcluster application
 *
 * (c) 2021 Dennis Soukhikh
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.ParseClassfd = exports.ParseMcnames = exports.ParseSatlist = exports.CelesTrak = exports.SpaceOther = exports.SpaceTrack = void 0;
const SpaceTrack_1 = require('./src/SpaceTrack');

Object.defineProperty(exports, 'SpaceTrack', { enumerable: true, get() { return SpaceTrack_1.SpaceTrack; } });
const Other_1 = require('./src/Other');

Object.defineProperty(exports, 'SpaceOther', { enumerable: true, get() { return Other_1.SpaceOther; } });
const Celestrak_1 = require('./src/Celestrak');

Object.defineProperty(exports, 'CelesTrak', { enumerable: true, get() { return Celestrak_1.CelesTrak; } });
const parsers_1 = require('./src/Other/parsers');

Object.defineProperty(exports, 'ParseSatlist', { enumerable: true, get() { return parsers_1.ParseSatlist; } });
Object.defineProperty(exports, 'ParseMcnames', { enumerable: true, get() { return parsers_1.ParseMcnames; } });
Object.defineProperty(exports, 'ParseClassfd', { enumerable: true, get() { return parsers_1.ParseClassfd; } });
