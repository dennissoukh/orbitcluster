/* eslint no-extend-native: ["error", { "exceptions": ["Number"] }] */

Number.prototype.convertToInt = function convertToInt(value) {
    const num = Number.parseInt(value.replace(/,/g, ''), 10);

    return Number.isNaN(num) ? num : null;
};

Number.prototype.convertToFloat = function convertToFloat(value) {
    const num = Number.parseFloat(value.replace(/,/g, ''), 10);

    return Number.isNaN(num) ? num : null;
};
