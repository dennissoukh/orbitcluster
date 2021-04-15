export default function parseTLEFile(data: string, source?: string | null): Promise<{
    tle_line0: string;
    tle_line1: string;
    tle_line2: string;
}[]>;
