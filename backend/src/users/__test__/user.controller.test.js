let server = require('../../../app');
let chai = require('chai');
let chaiHttp = require('chai-http');

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Users APIs', () => {
  describe('Test POST route /users', () => {
    let users = {
      username: 'test123',
      password: 'test111',
      firstName: 'test',
      lastName: 'test',
      addressOne: '18/154 Test Apartments',
      addressTwo: null,
      street: 'Sola road, Naranpura',
      city: 'Ahmedabad',
      email: 'test@gmail.com',
      state: 'Gujarat',
    };

    it('should create user', (done) => {
      chai
        .request(server)
        .post('/users/add')
        .send(users)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  })
  describe('Test GET route /users', () => {

    it('should return all users', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.users.should.be.a('array');
          response.body.users.length.should.not.be.eq(0);
          done();
        });
    });

    it('should NOT return all users', (done) => {
      chai
        .request(server)
        .get('/user')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
