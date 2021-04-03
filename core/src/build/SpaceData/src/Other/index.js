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
exports.SpaceOther = void 0;
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const url_1 = require("url");
const common_1 = require("./common");
class SpaceOther {
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!common_1.common[options.class]) {
                throw new Error(`The class ${options.class} does not exist`);
            }
            const url = this.parseURL(common_1.common[options.class]);
            const res = yield this.getRequest(url.href);
            if (url.fileType === '.zip') {
                return yield this.zip(res);
            }
            else if (url.fileType === '.txt' || url.fileType === '.tle') {
                return yield this.plainText(res);
            }
            else if (url.fileType === '.csv') {
            }
            else {
                throw new Error('Filetype not supported');
            }
        });
    }
    getRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const req = https_1.default.get(url, (res) => {
                    let chunks = [];
                    res.on('data', (d) => {
                        chunks.push(d);
                    }).on('end', () => {
                        let data = Buffer.concat(chunks);
                        return resolve(data);
                    });
                });
                req.on('error', (error) => {
                    const err = new Error(`Could not download file: ${error.message}`);
                    return reject(err);
                });
                req.end();
            });
        });
    }
    parseURL(url) {
        const parsedUrl = new url_1.URL(url);
        // Get the file type
        const fileType = path_1.default.extname(parsedUrl.pathname);
        return {
            href: parsedUrl.href,
            fileType: fileType,
        };
    }
    zip(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            const zip = new adm_zip_1.default(stream);
            const zipEntries = zip.getEntries();
            let result = '';
            zipEntries.forEach((entry) => {
                result = zip.readAsText(entry);
            });
            return result;
        });
    }
    plainText(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            return stream.toString('utf8');
        });
    }
}
exports.SpaceOther = SpaceOther;
