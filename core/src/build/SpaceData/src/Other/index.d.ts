/// <reference types="node" />
export declare class SpaceOther {
    get(options: {
        class: string;
    }): Promise<string | undefined>;
    getRequest(url: string): Promise<unknown>;
    parseURL(url: string): {
        href: string;
        fileType: string;
    };
    zip(stream: Buffer): Promise<string>;
    plainText(stream: Buffer): Promise<string>;
}
