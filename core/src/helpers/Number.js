/* eslint no-extend-native: ["error", { "exceptions": ["Number"] }] */

Number.prototype.convertToInt = convertToInt = (value) => {
    const num = Number.parseInt(value.replace(/,/g, ''), 10);

    return isNaN(num) ? num : null;
}

Number.prototype.convertToFloat = convertToFloat = (value) => {
    const num = Number.parseFloat(value.replace(/,/g, ''), 10);
}
