import request from 'supertest';
import { expect } from 'chai'; 
import createServer from 'app/server';

const app = createServer();

import Ajv from 'ajv';
const ajv = new Ajv();

import citySchema from 'test/schema/city.schema'
const validateCity = ajv.compile(citySchema);

import forecastSchema from 'test/schema/forecast.schema';
const validateForecast = ajv.compile(forecastSchema);

describe('API route', () => {
  it('/api/forecast responds with 200 and right content type', async () => {
    let result = await request(app)
    .get("/api/forecast")
    .expect(200);

    expect(result.headers['content-type']).to.equal('application/json; charset=utf-8');    
    expect(result.body).to.be.an('array');
    result.body.forEach((element:any) => {
      expect(element).to.be.an('object');
      expect(element).have.property('city');
      expect(element).have.property('forecast');

      expect(validateForecast(element.forecast)).to.be.equal(true);
      expect(validateCity(element.city)).to.be.equal(true);
    });
  }).timeout(10000);
});