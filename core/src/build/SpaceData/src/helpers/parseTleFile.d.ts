export default function parseTLEFile(data: string): Promise<{
    name: string;
    tle_line1: string;
    tle_line2: string;
}[]>;
