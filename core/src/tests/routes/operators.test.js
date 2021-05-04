const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('/operators', () => {
    it('checking route properties', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/operators')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('metadata');
                chai.expect(res.body).to.have.property('data');
            });
        done();
    });
});

describe('/operators/:id', () => {
    it('checking route properties upon valid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/operators/CIS')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('metadata');
                chai.expect(res.body).to.have.property('data');
            });

        done();
    });

    it('checking route properties upon invalid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/operators/InvalidEntry')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(404);
            });

        done();
    });
});
