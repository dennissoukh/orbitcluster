/* eslint no-extend-native: ["error", { "exceptions": ["Number"] }] */

Number.prototype.convertToInt = function convertToInt() {
    const num = Number.parseInt(this.replace(/,/g, ''), 10);

    return Number.isNaN(num) ? null : num;
};

Number.prototype.convertToFloat = function convertToFloat() {
    const num = Number.parseFloat(this.replace(/,/g, ''), 10);

    return Number.isNaN(num) ? null : num;
};
