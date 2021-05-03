const { expect } = require('chai');
const { handleEmpty } = require('../../helpers/Str');

describe('handleEmpty', () => {
    it('checking for valid input', () => {
        expect(handleEmpty('Liam')).to.equal('Liam');
    });

    it('empty input should equal null', () => {
        expect(handleEmpty('')).to.equal(null);
    });
});
