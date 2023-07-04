const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const User = require('../userModel');

chai.use(chaiHttp);
chai.should();


  describe('POST /api/users', () => {
    it('should add a new user to the database', (done) => {
      const newUser = {
        username: 'testuser',
        password: 'testpassword',
        email: 'testuser@test.com'
      };

      chai.request(app)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('username').eq('testuser');
          res.body.should.have.property('email').eq('testuser@test.com');
          done();
        });
    });
  });

  describe('GET /api/users', () => {
    it('should return all users in the database', (done) => {
      // const user1 = {
      //   username: 'user1',
      //   password: 'password1',
      //   email: 'user1@test.com'
      // };
      // const user2 = {
      //   username: 'user2',
      //   password: 'password2',
      //   email: 'user2@test.com'
      // };
      // User.save(user1);
      // User.save(user2);

      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.lengthOf(3);
          done();
        });
    });
  });

  describe('GET /api/users/testuser', () => {
    it('should return a fictitious user profile', (done) => {
      chai.request(app)
        .get('/api/users/testuser')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          done();
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return the user with the given id', (done) => {
      const user = {
        username: 'testuser',
        password: 'testpassword',
        email: 'testuser@test.com'
      };
      const newUser = User.save(user);

      chai.request(app)
        .get(`/api/users/${newUser.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eq(newUser.id);
          res.body.should.have.property('username').eq(newUser.username);
          res.body.should.have.property('email').eq(newUser.email);
          done();
        });
    });

    it('should return an error message if the user with the given id does not exist', (done) => {
      chai.request(app)
        .get('/api/users/999')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eq('User not found');
          done();
        });
    });
  });

  describe('PATCH /api/users/me', () => {
    it('should update the user object with the given properties', (done) => {
      const updatedUser = {
        username: 'updateduser',
        email: 'updateduser@test.com'
      };
  
      chai.request(app)
        .patch('/api/users/me')
        .send(updatedUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eq('updateduser');
          res.body.should.have.property('email').eq('updateduser@test.com');
          done();
        });
    });
  });
  
describe('DELETE /api/users/:id', () => {
    it('should remove the user with the given id from the database', (done) => {
      const user = {
        username: 'testuser',
        password: 'testpassword',
        email: 'testuser@test.com'
      };
      const newUser = User.save(user);
  
      chai.request(app)
        .delete(`/api/users/${newUser.id}`)
        .end((err, res) => {
          res.should.have.status(204);
          User.findById(newUser.id).should.be.undefined;
          done();
        });
    });
  });
