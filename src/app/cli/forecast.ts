import 'dotenv/config';
import MusementService from '../lib/musement';
import WeatherService from '../lib/weather';
import CityForecastUtil, { FormatterTextPlain } from '../lib/forecast';

async function init(){
  const musementApiBaseUrl:string = process.env.MUSEMENT_API_BASE_URL || "";
  const weatherApiBaseUrl:string = process.env.WEATHER_API_BASE_URL || "";
  const weatherApiKey:string = process.env.WEATHER_API_AUTH_KEY || "";

  // set params
  const cityLimit: number | undefined = process.env.DEFAULT_CITY_LIMIT ? parseInt(process.env.DEFAULT_CITY_LIMIT) : undefined;
  const lang: string | undefined = process.env.DEFAULT_LANG || undefined;
  const forecastDays: number | undefined = process.env.DEFAULT_FORECAST_DAYS ? parseInt(process.env.DEFAULT_FORECAST_DAYS) : undefined;
  
  try {
    // instance musement service
    const ms = new MusementService(musementApiBaseUrl);

    // instance the weather service
    const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey});
    
    // we get the list of the cities with their own forecast data
    const cityForecastList = await CityForecastUtil.builder(ms, ws, {cityLimit: cityLimit, lang: lang, forecastDays: forecastDays});

    // // we display the formatted data in console
    console.log(FormatterTextPlain.format(cityForecastList));

  } catch(error) {
    console.log(`an error occurred: ${error.message}`);
  }
}

init();

