import request from 'supertest'
import users from '../routes/users';



describe('test users api', function() {

  it('should return users list', (done) => {
    request(users)
      .get('/')
      .expect(200)
      .expect('Content-type', /application\/json/)
      .end(done)
  })
});