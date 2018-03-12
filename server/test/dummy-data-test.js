import app from '../../app';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();

chai.use(chaiHttp);

describe('Route tests', () => {
  describe('Users routes', () => {
    context('handles valid inputs', () => {
      it('should return all available users', () => {
        chai.request(app)
          .get('/api/v1/auth/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
    });

    context('handles invalid input', () => {
      it('should return error for getting users', () => {
        chai.request(app)
          .get('/api/v1/auth/user')
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an.instanceof(Object);
          });
      });
    });
  });

  describe('Businesses Route', () => {
    context('handles valid inputs', () => {
      it('should return all business', () => {
        chai.request(app)
          .get('/api/v1/businesses')
          .end((req, res) => {
            res.body.should.be.an.instanceof(Object);
            res.should.have.status(200);
          });
      });
    });
    context('handles invalid inputs', () => {
      it('should not return businesses on request', () => {
        chai.request(app)
          .get('/api/v1/business')
          .end((req, res) => {
            res.should.have.status(400);
            res.should.be.an.instanceof(Object);
          });
      });
    });
  });
});

