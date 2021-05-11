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
exports.CelesTrak = void 0;
const https_1 = __importDefault(require("https"));
const common_1 = __importDefault(require("./common"));
class CelesTrak {
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateOptions(options);
            try {
                const request = yield this.getRequest(options);
                return request;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getRequest(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const url = this.buildURL(options);
                let chunks = [];
                const req = https_1.default.request(url, (res) => {
                    res.on('data', (d) => {
                        chunks.push(d);
                    }).on('end', () => {
                        let data = Buffer.concat(chunks).toString('utf8');
                        // If the string is of JSON format, we'll return that instead
                        if (this.hasJsonStructure(data)) {
                            data = JSON.parse(data);
                        }
                        return resolve(data);
                    });
                });
                req.on('error', (error) => {
                    const err = new Error(error.message);
                    return reject(err);
                });
                req.end();
            });
        });
    }
    buildURL(options) {
        const host = common_1.default.baseURL;
        const path = common_1.default.setURLS[options.type](options.set, options.format);
        return `${host}${path}`;
    }
    validateOptions(options) {
        if (!common_1.default.types.includes(options.type)) {
            throw new Error('The CelesTrak type option is incorrect');
        }
        if (!common_1.default[options.type].includes(options.set)) {
            throw new Error('The CelesTrak set option is incorrect');
        }
        if (options.type === 'GPElementSets' &&
            options.format &&
            !common_1.default.GPElementSetFormats.includes(options.format)) {
            throw new Error('The CelesTrak format option is incorrect');
        }
    }
    hasJsonStructure(str) {
        if (typeof str !== 'string')
            return false;
        try {
            const result = JSON.parse(str);
            const type = Object.prototype.toString.call(result);
            return type === '[object Object]'
                || type === '[object Array]';
        }
        catch (err) {
            return false;
        }
    }
}
exports.CelesTrak = CelesTrak;
