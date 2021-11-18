const request = require('supertest');
const app = require('../server/app');
const db = require('../server/database/db');

describe('POST /auth/signup', function () {
  beforeAll(async () => {
    const queryString = `
      DELETE FROM
        players
      WHERE
        players.username = $1;
    `;
    await db.query(queryString, ['signuptestuser']);
  });

  it('responds with confirmation message on success.', function (done) {
    request(app)
      .post('/api/auth/signup')
      .send({ username: 'signuptestuser', password: 'testpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({ msg: 'signup successful' }, done);
  });

  it('responds with 400 status on failure.', function (done) {
    request(app)
      .post('/api/auth/signup')
      .send({ username: 'permanenttestuser', password: 'testpassword' })
      .expect(400, done);
  });
});

describe('POST /auth/login', function () {
  it('responds with confirmation message on success.', function (done) {
    request(app)
      .post('/api/auth/login')
      .send({ username: 'permanenttestuser', password: 'testpassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('set-cookie', /sess=/)
      .expect(200)
      .expect({ msg: 'login successful' }, done);
  });

  it('responds with 401 status on failure.', function (done) {
    request(app)
      .post('/api/auth/login')
      .send({ username: 'permanenttestuser', password: 'wrongpassword' })
      .expect(401, done);
  });
});
