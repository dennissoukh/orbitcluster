import { Mcnames, Satlist } from "./contracts";
/**
 * Process satlist.csv
 */
export declare function ParseSatlist(data: any): Promise<Satlist[]>;
/**
 * Process mcnames.zip
 */
export declare function ParseMcnames(data: any): Promise<Mcnames[]>;
