const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

describe('/launchsites', () => {
    it('checking route properties', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/launchsites')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('metadata');
                chai.expect(res.body).to.have.property('data');
            })
        done();
    });
});

describe('/launchsites/:id', () => {
    it('checking route properties upon valid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/launchsites/AFETR')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('launchSite');
                chai.expect(res.body).to.have.property('satellites');
            })

        done();
    });

    it('checking route properties upon invalid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/launchsites/InvalidEntry')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(404);
            })

        done();
    });
});

