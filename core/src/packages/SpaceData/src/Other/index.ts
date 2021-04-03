import https from "https";
import path from "path";
import AdmZip from 'adm-zip';
import { URL } from "url";
import { common } from "./common";

export class SpaceOther {
    async get(options: { class: string }) {
        if (!common[options.class]) {
            throw new Error(`The class ${options.class} does not exist`);
        }

        const url = this.parseURL(common[options.class]);
        const res: any = await this.getRequest(url.href);

        if (url.fileType === '.zip') {
            return await this.zip(res);
        }

        if (url.fileType === '.txt' || url.fileType === '.tle') {
            return await this.plainText(res);
        }

        throw new Error('Filetype not supported');
    }

    async getRequest(url: string) {
        return new Promise((resolve, reject) => {
            const req = https.get(url, (res) => {
                let chunks: Uint8Array[] = [];

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
        })
    }

    parseURL(url: string) {
        const parsedUrl = new URL(url);

        // Get the file type
        const fileType = path.extname(parsedUrl.pathname);

        return {
            href: parsedUrl.href,
            fileType: fileType,
        };
    }

    async zip(stream: Buffer) {
        const zip = new AdmZip(stream);
        const zipEntries = zip.getEntries();
        let result = '';

        zipEntries.forEach((entry: string) => {
            result = zip.readAsText(entry);
        });

        return result;
    }

    async plainText(stream: Buffer) {
        return stream.toString('utf8');
    }
}
