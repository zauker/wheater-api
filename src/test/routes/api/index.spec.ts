import request from 'supertest';
import createServer from 'app/server';

const app = createServer();

describe('API route', () => {
  it('/api responds with 200', (done) => {
    request(app)
    .get("/api")
    .expect(200)
    .end(done);
  });
});