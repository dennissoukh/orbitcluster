const { expect } = require('chai');
const { convertToInt, convertToFloat } = require('../../helpers/Number');

describe('convertToInt', () => {
    it('converts a string value to a number integer literal', () => {
        expect(convertToInt('5')).to.equal(5);
    });

    it('returns null if the value cannot be converted to a number', () => {
        expect(convertToInt('enda')).to.equal(null);
    });

    it('converts a integer value to a number integer literal', () => {
        expect(convertToInt(150)).to.equal(150);
    });

    it('converts a decimal value to a number integer literal', () => {
        expect(convertToInt(13.5)).to.equal(13);
    });
})

describe('convertToDecimal', () => {
    it('converts a string value to a number literal', () => {
        expect(convertToFloat('5')).to.equal(5);
    });

    it('returns null if the value cannot be converted to a number', () => {
        expect(convertToFloat('enda')).to.equal(null);
    });

    it('converts a integer value to a number literal', () => {
        expect(convertToFloat(150)).to.equal(150);
    });

    it('converts a decimal value to a number literal', () => {
        expect(convertToFloat(13.5)).to.equal(13);
    });
});
