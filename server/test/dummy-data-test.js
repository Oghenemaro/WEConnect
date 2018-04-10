import app from '../../app';

const chai = require('chai');
const chaiHttp = require('chai-http');
require('chai').should();

chai.use(chaiHttp);

describe('Route tests', () => {
  let record, queryRecord, bRecord = {};
  beforeEach(() => {
    record = {
      id: '1',
      username: 'maroz',
      password: 'mweconnect',
      firstname: 'maro',
      lastname: 'maroal',
      email: 'maroz@weconnect.com',
      telephone: '08073349770',
      address: '24 bode-thomas street'
    };
    bRecord = {
      // id: 1,
      businessName: 'eclipse',
      businessDescription: 'We are a resturant company that serves all kinds of food, we welcome you to explore our menu',
      businessLocation: 'lagos',
      businessCategory: 'resturant',
      reviews: ['Enjoyed my meal.Thanks!', 'Great Shrimps']
    };
    queryRecord = {
      location: 'lagos',
      catgory: 'resturant'
    };
  });

  describe('Users routes', () => {
    // handles valid inputs for users
    context('handles valid inputs', () => {
      it('should return all available users', () => {
        chai.request(app)
          .get('/api/v1/auth/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should create a new users', () => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(record)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should authenticate user', () => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(record)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
    });

    // handle invalid inputs for users
    context('handles invalid input', () => {
      it('should return error for getting users', (done) => {
        chai.request(app)
          .get('/api/v1/auth/user')
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an.instanceof(Object);
            done();
          });
      });
      it('should not create a new users', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
            done();
          });
      });
      it('should not authenticate user', () => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
          });
      });
    });
  });

  // business tests
  describe('Businesses Route', () => {
    // business valid inputs
    context('handles valid inputs', () => {
      it('should return all business', (done) => {
        chai.request(app)
          .get('/api/v1/businesses')
          .end((err, res) => {
            res.body.should.be.an.instanceof(Object);
            res.should.have.status(200);
            done();
          });
      });
      it('should create a new business', () => {
        chai.request(app)
          .post('/api/v1/businesses/')
          .send(bRecord)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should update an existing business', () => {
        chai.request(app)
          .put('/api/v1/businesses/1')
          .send(bRecord)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should delete a business', () => {
        chai.request(app)
          .delete('/api/v1/businesses/:id')
          .send(bRecord)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should get a business', (done) => {
        chai.request(app)
          .get('/api/v1/businesses/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
            done();
          });
      });
      it('should post a business review', () => {
        chai.request(app)
          .post('/api/v1/businesses/:id/reviews')
          .send(bRecord)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should get all reviews for a business', () => {
        chai.request(app)
          .get('/api/v1/business/1/reviews')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should return all businesses in specified location', () => {
        chai.request(app)
          .get('/api/v1/businesses?location')
          .send(queryRecord)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an.instanceof(Object);
          });
      });
    });
    // business invalid input
    context('handles invalid inputs', () => {
      it('should not return businesses on request', () => {
        chai.request(app)
          .get('/api/v1/business')
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an.instanceof(Object);
          });
      });
      it('should not create a new business', (done) => {
        chai.request(app)
          .post('/api/v1/businesses/')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
            done();
          });
      });
      it('should not update a businesses on request', (done) => {
        chai.request(app)
          .put('/api/v1/businesses/:id')
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an.instanceof(Object);
            done();
          });
      });
      it.skip('should not delete a business', () => {
        chai.request(app)
          .delete('/api/v1/businesses/10')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it('should not get a business', (done) => {
        chai.request(app)
          .get('/api/v1/businesses/:id')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
            done();
          });
      });
      it('should not post a business review', () => {
        chai.request(app)
          .post('/api/v1/businesses/:id/reviews')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
          });
      });
      it.skip('should not get all reviews for a business', () => {
        chai.request(app)
          .get('/api/v1/business/:id/reviews')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an.instanceof(Object);
          });
      });
    });
  });
});

