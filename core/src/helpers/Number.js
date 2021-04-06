/**
 * Convert a number to an int, returning null if the value is empty
 */
const convertToInt = (value) => {
    const num = Number.parseInt(value.replace(/,/g, ''), 10);

    return Number.isNaN(num) ? null : num;
};

/**
 * Convert a number to float, returning null if the value is empty
 */
const convertToFloat = (value) => {
    const num = Number.parseFloat(value.replace(/,/g, ''), 10);

    return Number.isNaN(num) ? null : num;
};

module.exports = {
    convertToInt,
    convertToFloat,
};
