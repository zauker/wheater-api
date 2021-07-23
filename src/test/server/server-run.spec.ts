import request from 'supertest';
import { expect } from 'chai';
import createServer from 'app/server';

const app = createServer();

describe('server checks', () => {
  it('server is created without error', (done) => {
    request(app)
    .get("/")
    .expect(200)
    .end(done);
  });
});