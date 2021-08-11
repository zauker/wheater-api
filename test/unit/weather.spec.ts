import "dotenv/config";
import { expect } from "chai";
import chaiXml from 'chai-xml';
import Ajv from 'ajv';
import WeatherService, { WeatherForecastResponse } from "../../src/app/lib/weather";

const ajv = new Ajv();
const chai = require('chai');
chai.use(chaiXml);
const weatherApiBaseUrl:string = process.env.WEATHER_API_BASE_URL || "";
const weatherApiKey:string = process.env.WEATHER_API_AUTH_KEY || "";

import forecastSchema from '../schema/forecast.schema';
const validateForecast = ajv.compile(forecastSchema);

let forecast: WeatherForecastResponse;

describe('WeatherService - without params', () => {

  it('forecast return an object', async() => {
    const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey});
    forecast = await ws.forecast({q: 'Rome'});
    expect(forecast).to.be.an('object');
  });
  it('forecast city name is equal to requested (Rome)', () => {
    expect(forecast.location.name).to.be.equal('Rome');
  });
  it('forecast days expected are 1', () => {
    expect(forecast.forecast.forecastday).to.be.an('array').that.lengthOf(1);
  });
  it('forecast shoul have forecast schema', () => {
    expect(validateForecast(forecast)).to.be.equal(true);
  });

}).timeout(10000);

describe('WeatherService - with format XML', () => {

  it('forecast return an XML', async() => {
    const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey, format: 'xml'});
    forecast = await ws.forecast({q: 'Rome'});
    expect(forecast).xml.to.be.valid();
  });

}).timeout(10000);

describe('WeatherService - with format JSON and days param', () => {

  it('forecast return an object', async() => {
    const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey, format: 'json'});
    forecast = await ws.forecast({q: 'Rome', days: 3});
    expect(forecast).to.be.an('object');
  });
  it('forecast city name is equal to requested (Rome)', () => {
    expect(forecast.location.name).to.be.equal('Rome');
  });
  it('forecast days expected are 3', () => {
    expect(forecast.forecast.forecastday).to.be.an('array').that.lengthOf(3);
  });
  it('forecast shoul have forecast schema', () => {
    expect(validateForecast(forecast)).to.be.equal(true);
  });

}).timeout(10000);