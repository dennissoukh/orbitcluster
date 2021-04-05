Object.defineProperty(exports, '__esModule', { value: true });
async function parseTLEFile(data) {
    const tles = [];
    const lines = data.split(/\r\n|\n\r|\n|\r/);
    let i = 0;
    while (true) {
        const line = lines[i++];
        if (!line) break;
        if (!(line.startsWith('1') || line.startsWith('2'))) {
            const sat = {
                tle_line0: line.trim(),
                tle_line1: lines[i++],
                tle_line2: lines[i++],
            };
            tles.push(sat);
        }
    }
    return tles;
}
exports.default = parseTLEFile;
