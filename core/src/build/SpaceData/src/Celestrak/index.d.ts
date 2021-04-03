import { Options } from "./contracts";
export declare class CelesTrak {
    get(options: Options): Promise<unknown>;
    getRequest(options: Options): Promise<unknown>;
    buildURL(options: Options): string;
    validateOptions(options: Options): void;
    hasJsonStructure(str: string): boolean;
}
