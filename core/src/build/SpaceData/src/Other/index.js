const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.SpaceOther = void 0;
const https_1 = __importDefault(require('https'));
const path_1 = __importDefault(require('path'));
const adm_zip_1 = __importDefault(require('adm-zip'));
const sync_1 = __importDefault(require('csv-parse/lib/sync'));
const url_1 = require('url');
const common_1 = require('./common');

class SpaceOther {
    async get(options) {
        if (!common_1.common[options.class]) {
            throw new Error(`The class ${options.class} does not exist`);
        }
        const url = this.parseURL(common_1.common[options.class]);
        const res = await this.getRequest(url.href);
        if (url.fileType === '.zip') {
            return await this.zip(res);
        }
        if (url.fileType === '.txt' || url.fileType === '.tle') {
            return await this.plainText(res);
        }
        if (url.fileType === '.csv') {
            return await this.csv(res);
        }
        throw new Error('Filetype not supported');
    }
    async getRequest(url) {
        return new Promise((resolve, reject) => {
            const req = https_1.default.get(url, (res) => {
                const chunks = [];
                res.on('data', (d) => {
                    chunks.push(d);
                }).on('end', () => {
                    const data = Buffer.concat(chunks);
                    return resolve(data);
                });
            });
            req.on('error', (error) => {
                const err = new Error(`Could not download file: ${error.message}`);
                return reject(err);
            });
            req.end();
        });
    }
    parseURL(url) {
        const parsedUrl = new url_1.URL(url);
        // Get the file type
        const fileType = path_1.default.extname(parsedUrl.pathname);
        return {
            href: parsedUrl.href,
            fileType,
        };
    }
    async zip(stream) {
        const zip = new adm_zip_1.default(stream);
        const zipEntries = zip.getEntries();
        let result = '';
        zipEntries.forEach((entry) => {
            result = zip.readAsText(entry);
        });
        return result;
    }
    async plainText(stream) {
        return stream.toString('utf8');
    }
    async csv(stream) {
        const res = sync_1.default(stream, {
            skipEmptyLines: true,
            delimiter: undefined,
            trim: true,
        });
        return res;
    }
}
exports.SpaceOther = SpaceOther;
