const request = require('supertest');
const app = require('../server/app');

describe('GET /player', function () {
  it('responds with JSON containing player data.', function (done) {
    request(app)
      .get('/api/player/permanenttestuser')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ username: 'permanenttestuser', games: '0', wins: '0' }, done);
  });
});

describe('GET /leaders', function () {
  it('responds with array containing top players.', function (done) {
    request(app)
      .get('/api/player/leaders')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
