const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('/categories', () => {
    it('checking route properties', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/categories')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('data');
            });
        done();
    });
});

describe('/categories/:id', () => {
    it('checking route properties upon valid entry', async (done) => {
        chai.request('http://localhost:3000')
            .get('/v1/categories/visual')
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
            .get('/v1/categories/InvalidEntry')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(404);
            });

        done();
    });
});
