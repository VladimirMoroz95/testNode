import request from 'supertest'
import users from '../app';



describe('test api', function() {

  describe('test users api', function() {

    it('Get user list', (done) => {
      request(users)
        .get('/users')
        .expect(200)
        .expect('Content-type', /application\/json/)
        .end(done)
    });

    it('Get user by ID', (done) => {
      request(users).get('/users/')
        .query({ id: '1' })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .end(done)
    });

    it('Add new user', (done) => {
      request(users).post('/users')
        .expect(200)
        .send({
          login: "admin",
          password: "123456",
          fio: "Alexander Pushkin"
        })
        .expect('Content-type', /application\/json/)
        .end(done)
    });
  });


});