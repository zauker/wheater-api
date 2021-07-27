import 'dotenv/config';
import MusementService from 'lib/musement';
import WeatherService from 'lib/weather';
import CityForecastUtil, { FormatterPlain } from 'lib/forecast';

async function init(){
  const musementApiBaseUrl:string = process.env.MUSEMENT_API_BASE_URL || "";
  const weatherApiBaseUrl:string = process.env.WEATHER_API_BASE_URL || "";
  const weatherApiKey:string = process.env.WEATHER_API_AUTH_KEY || "";

  try {
    // instance musement service
    const ms = new MusementService(musementApiBaseUrl);

    // instance the weather service
    const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey});
    
    // we get the list of the cities with their own forecast data
    let cityForecastList = await CityForecastUtil.builder(ms, ws, {cityLimit: 10, lang: 'it', forecastDays: 2});

    // we plain format the received data 
    let cityForecastPlainList = FormatterPlain.format(cityForecastList);

    // we display the formatted data in console
    cityForecastPlainList.forEach(element => console.log(element) );
    
  } catch(error) {
    throw Error(`an error occurred: ${error.message}`);
  }
};

init();

