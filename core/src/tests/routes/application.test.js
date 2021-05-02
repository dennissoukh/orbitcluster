const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

describe('/', () => {
    it('checking for welcome message', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('message');
            })
        done();
    });
});
