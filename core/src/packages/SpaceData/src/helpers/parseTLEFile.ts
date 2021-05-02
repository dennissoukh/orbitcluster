export default async function parseTLEFile(data: string, source: string | null = null) {
    const tles: { tle_line0: string, tle_line1: string, tle_line2: string }[] = [];
    const lines = data.split(/\r\n|\n\r|\n|\r/);

    let i = 0;
    while (true) {
        let line = lines[i++];
        if (!line) break;

        if (!(line.startsWith('1') || line.startsWith('2'))) {
            const sat = {
                tle_line0: line.trim(),
                tle_line1: lines[i++],
                tle_line2: lines[i++],
                source,
            }

            tles.push(sat);
        }
    }

    return tles;
}
