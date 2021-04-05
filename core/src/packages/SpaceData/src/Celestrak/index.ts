import https from "https";
import common from "./common";
import { Options } from "./contracts";

export class CelesTrak {
    async get(options: Options) {
        this.validateOptions(options);

        try {
            const request = await this.getRequest(options);
            return request;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRequest(options: Options) {
        return new Promise((resolve, reject) => {
            const url = this.buildURL(options);

            let chunks: Uint8Array[] = [];
            const req = https.request(url, (res) => {
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

            req.on('error', (error: Error) => {
                const err = new Error(error.message);
                return reject(err);
            });

            req.end();
        });
    }

    buildURL(options: Options) {
        const host = common.baseURL;
        const path = common.setURLS[options.type](options.set, options.format);

        return `${host}${path}`;
    }

    validateOptions(options: Options) {
        if (!common.types.includes(options.type)) {
            throw new Error('The CelesTrak type option is incorrect');
        }

        if (!common[options.type].includes(options.set)) {
            throw new Error('The CelesTrak set option is incorrect');
        }

        if (options.type === 'GPElementSets' &&
            options.format &&
            !common.GPElementSetFormats.includes(options.format)
        ) {
            throw new Error('The CelesTrak format option is incorrect');
        }
    }

    hasJsonStructure(str: string) {
        if (typeof str !== 'string') return false;
        try {
            const result = JSON.parse(str);
            const type = Object.prototype.toString.call(result);
            return type === '[object Object]'
                || type === '[object Array]';
        } catch (err) {
            return false;
        }
    }
}
