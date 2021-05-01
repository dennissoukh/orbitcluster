const { expect } = require('chai');
const { generateIdempotencyKey, parsePagination, generateBasePaginationMetadata } = require('../../helpers/route');

describe('generateIdempotencyKey', () => {
    it('checking for valid prefix', () => {
        expect(generateIdempotencyKey('43a', null)).to.be.a('string').and.satisfy(str => str.startsWith('43a'));
    });

    it('checking if specified length is correct', () => {
        expect(generateIdempotencyKey(null, 16)).to.have.lengthOf(16);
    });

    it('checking if specified prefix & length is correct', () => {
        expect(generateIdempotencyKey('43a', 16)).to.have.lengthOf(19).to.be.a('string').and.satisfy(str => str.startsWith('43a'));
    });
});

describe('parsePagination', () => {
    it('checking for valid query', () => {
        expect(parsePagination({ query: { page: 5, limit: 3 } })).to.deep.equal({ page: 5, limit: 3, skip: 15 } );
    });
    it('checking for default values', () => {
        expect(parsePagination({ query: { page: 5, limit: null } })).to.deep.equal({ page: 5, limit: 10, skip: 50 } );
    });
});

describe('generateBasePaginationMetadata', () => {
    it('checking for valid query', () => {
        expect(generateBasePaginationMetadata(2, 4, 4, 5, 6)).to.deep.equal({ page: 2 , limit: 4, pages: 1, count: 4, skip: 5, pageCount:6 } );
    });
});
