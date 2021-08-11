import "dotenv/config";
import { expect } from "chai";
import chaiXml from 'chai-xml';
import Ajv from 'ajv';
import MusementService, { City } from "../../src/app/lib/musement";
let cities:City[];
const ajv = new Ajv();
const chai = require('chai');
chai.use(chaiXml);
const musementApiBaseUrl:string = process.env.MUSEMENT_API_BASE_URL || "";

import citySchema from '../schema/city.schema'
const validateCity = ajv.compile(citySchema);

describe('MusementService - without params', () => {
  beforeEach( async() => {
    const ms = new MusementService(musementApiBaseUrl);
    cities = await ms.getCities();
  }); 
  it('getCities return an array', () => {
    expect(cities).to.be.an('array');
  });
  it('getCities each element of array should have City schema', (done) => {
    cities.forEach(city => expect(validateCity(city)).to.be.equal(true) );
    done();
  });
});

describe('MusementService - with format XML', () => {
  beforeEach( async() => {    
    const ms = new MusementService(musementApiBaseUrl, {format: 'xml'});
    cities = await ms.getCities({limit:1});
  }); 
  it('getCities return an XML', () => {
    expect(cities).xml.to.be.valid();
  });
});

describe('MusementService - with format JSON and limit param', () => {
  beforeEach( async() => {
    const ms = new MusementService(musementApiBaseUrl, {format: 'json'});
    cities = await ms.getCities({limit:3});
  }); 
  it('getCities return an array', () => {
    expect(cities).to.be.an('array');
  });
  it('getCities each element of array should have City schema', (done) => {
    cities.forEach(city => expect(validateCity(city)).to.be.equal(true) );
    done();
  });
  it('getCities have only three elements', () => {
    expect(cities).to.have.lengthOf(3);
  });

});