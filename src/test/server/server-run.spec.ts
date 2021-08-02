import request from 'supertest';
import createServer from 'app/server';

const app = createServer();

describe('Server checks', () => {
  it('server is created without error', (done) => {
    request(app)
    .get("/")
    .expect(200)
    .end(done);
  });
});