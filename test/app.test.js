import request from 'supertest'
import app from '../app';



describe('test api', function() {

  describe('test users api', function() {

    it('Get user list', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect('Content-type', /application\/json/)
        .end(done)
    });

    it('Get user by ID', (done) => {
      request(app).get('/users/')
        .query({ id: '1' })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .end(done)
    });

    it('Add user who already exists', (done) => {
      request(app).post('/users')
        .expect(400)
        .send({
          login: "admin",
          password: "123456",
          fio: "Alexander Pushkin"
        })
        .expect('Content-type', /text\/html/)
        .end(done)
    });
  });

  describe('test authhorization api', function() {

    it('Login with correct login and pass', (done) => {
      request(app).post('/auth/login')
        .expect(200)
        .send({
          login: "admin",
          password: "123456",
        })
        .expect('Content-type', /text\/html/)
        .end(done)
    });

    it('Login with incorrect login and pass', (done) => {
      request(app).post('/auth/login')
        .expect(400)
        .send({
          login: "adminfewf",
          password: "123456dfwef",
        })
        .expect('Content-type', /text\/html/)
        .end(done)
    });


  });

  describe('test articles api', function() {

    it('Get articles list', (done) => {
      request(app)
        .get('/articles')
        .expect(200)
        .expect('Content-type', /application\/json/)
        .end(done)
    });


    it('Add new article', (done) => {
      request(app).post('/articles')
        .expect(400)
        .send({
          title: "The best title",
          author_id: 1,
          tags: ["tag1", "tag2", "tag3"]
        })
        .expect('Content-type', /text\/html/)
        .end(done)
    });
  });

});