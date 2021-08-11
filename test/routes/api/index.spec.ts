import request from 'supertest';
import { expect } from 'chai'; 
import createServer from '../../../src/app/server';

const app = createServer();

describe('API route', () => {
  it('/api/forecast call withoud params', async () => {
    const result = await request(app)
    .get("/api/forecast");

    expect(result.status).be.equal(200);
    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');    
    expect(result.body).to.be.an('array');
    result.body.forEach((element:any) => {

      expect(element).to.be.an('object');
      expect(element).have.property('city');
      expect(element).have.property('forecast');

      expect(element.forecast).to.be.an('array');
      expect(element.city).to.be.a('string');
      element.forecast.forEach( (forecast:any) => {
        expect(forecast).to.be.a('string');        
      });
    });
  }).timeout(10000);

  it('/api/forecast with content type text/plain', async () => {
    const result = await request(app)
    .get("/api/forecast")
    .set('Content-type', 'text/plain');

    expect(result.status).be.equal(200);
    expect(result.headers['content-type']).to.equal('text/plain; charset=utf-8');    
    expect(result.text).to.be.an('string').and.not.be.empty;
    // TODO - check the format of each rows with a regex
    
  }).timeout(10000);

  it('/api/forecast with content type text/html', async () => {
    const result = await request(app)
    .get("/api/forecast")
    .set('Content-type', 'text/html')
    .query({ limit: 2 });

    expect(result.status).be.equal(200);
    expect(result.headers['content-type']).to.equal('text/html; charset=utf-8');    
    expect(result.text).to.be.an('string').and.not.be.empty;
    // TODO - check the format of each rows with a regex
    
  }).timeout(10000);

});