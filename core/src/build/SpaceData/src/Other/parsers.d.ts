import { Mcnames, Satlist } from "./contracts";
/**
 * Process satlist.csv
 */
export declare function ParseSatlist(data: any): Promise<Satlist[]>;
/**
 * Process mcnames.zip
 */
export declare function ParseMcnames(data: any): Promise<Mcnames[]>;
export declare function ParseClassfd(data: string): Promise<{
    tle_line0: string;
    tle_line1: string;
    tle_line2: string;
}[]>;
export declare function ParseAmsat(data: string): Promise<{
    tle_line0: string;
    tle_line1: string;
    tle_line2: string;
}[]>;
export declare function ParseHamsat(data: string): Promise<{
    tle_line0: string;
    tle_line1: string;
    tle_line2: string;
}[]>;
