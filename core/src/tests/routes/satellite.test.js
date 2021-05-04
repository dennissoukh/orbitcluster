const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('/satellites', () => {
    it('checking route properties', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/satellites')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('metadata');
            });
        done();
    });
});

describe('/satellites/:id', () => {
    it('checking route properties upon valid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/satellites/60707a58d7854039f4fa7052')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('data');
            });

        done();
    });

    it('checking route properties upon invalid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/satellites/invalidInput12345')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(404);
            });
        done();
    });
});

describe('/orbit/:id', () => {
    it('checking route properties upon valid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/orbit/60707a58d7854039f4fa7052')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('metadata');
            });
        done();
    });

    it('checking route properties upon invalid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/orbit/invalidInput12345')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(404);
            });
        done();
    });
});
