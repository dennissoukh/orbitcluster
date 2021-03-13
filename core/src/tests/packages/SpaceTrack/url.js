const { expect } = require('chai');
const url = require('../../../packages/SpaceTrack/lib/url');

describe('Space-Track API downloader', () => {
    describe('Create Space-Track URLs', () => {
        it('creates a satcat Space-Track API URL', () => {
            const satcat = url({
                class: 'satcat',
                format: 'json',
                query: [
                    {
                        field: 'NORAD_CAT_ID',
                        condition: '25544',
                    },
                ],
                predicates: [
                    'OBJECT_NAME',
                ],
            });

            expect(satcat).to.deep.equal('https://www.space-track.org/basicspacedata/query/class/satcat/NORAD_CAT_ID/25544/predicates/OBJECT_NAME/metadata/true/emptyresult/show/format/json');
        });

        it('creates a general pertubations Space-Track API URL', () => {
            const gp = url({
                class: 'gp',
                format: 'json',
                orderby: ['+OBJECT_NAME', '-PERIOD'],
                limit: 100,
            });

            expect(gp).to.deep.equal('https://www.space-track.org/basicspacedata/query/class/gp/orderby/OBJECT_NAME%20asc,PERIOD%20desc/limit/100,0/metadata/true/emptyresult/show/format/json');
        });
    });
});
