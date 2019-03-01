import supertest from 'supertest'
import users from '../routes/users';


const testServer = supertest(users);

describe('test users api', function() {

  it('should return users list', (done) => {
    testServer
      .get('/')
      .expect(200)
      .expect('Content-type', /application\/json/)
      .end(done)
  })
});