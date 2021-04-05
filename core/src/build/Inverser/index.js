/**
 * @orbitcluster/inverser - IOC Container for the Orbitcluster application
 *
 * (c) 2021 Dennis Soukhikh
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get() { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
const __exportStar = (this && this.__exportStar) || function (m, exports) {
    for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Ioc = void 0;
__exportStar(require('./src/Contracts'), exports);
const Ioc_1 = require('./src/Ioc');

Object.defineProperty(exports, 'Ioc', { enumerable: true, get() { return Ioc_1.Ioc; } });
