import {Request, Response} from 'express';
import MusementService from '../lib/musement';
import WeatherService from '../lib/weather';
import CityForecastUtil, { CityForecast, FormatterTextPlain, FormatterTextHtml, FormatterJson } from '../lib/forecast';


class ApiController {
  public async forecast( req: Request, res: Response ):Promise<void> {
    const musementApiBaseUrl:string = process.env.MUSEMENT_API_BASE_URL || "";
    const weatherApiBaseUrl:string = process.env.WEATHER_API_BASE_URL || "";
    const weatherApiKey:string = process.env.WEATHER_API_AUTH_KEY || "";
  
    // TODO - params validation with express validator module
    
    // set params
    const cityLimit: number | undefined = req.query.limit ? parseInt(<string>req.query.limit) : process.env.DEFAULT_CITY_LIMIT ? parseInt(process.env.DEFAULT_CITY_LIMIT) : undefined;
    const lang: string | undefined = <string>req.query.lang || process.env.DEFAULT_LANG || undefined;
    const forecastDays: number | undefined = req.query.days ? parseInt(<string>req.query.days) : process.env.DEFAULT_FORECAST_DAYS ? parseInt(process.env.DEFAULT_FORECAST_DAYS) : undefined;

    try {
      // instance musement service
      const ms = new MusementService(musementApiBaseUrl);
    
      // instance the weather service
      const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey});
      
      // we get the list of the cities with their own forecast data
      const cityForecastList: CityForecast[] = await CityForecastUtil.builder(ms, ws, {cityLimit: cityLimit, lang: lang, forecastDays: forecastDays});

      switch (req.headers['content-type']) {
        case 'text/plain':
console.log('text/plain');
          res.setHeader('content-type', 'text/plain').send(FormatterTextPlain.format(cityForecastList));
          break;
        case 'text/html':
console.log('text/html');
          res.setHeader('content-type', 'text/html').send(FormatterTextHtml.format(cityForecastList));
          break;    
        default:
console.log('application/json');
          res.setHeader('content-type', 'application/json').send(FormatterJson.format(cityForecastList));
      }
    } catch (error) {
      console.error(error.message);
      res.status(503).send('Service Unavailable');
    }
    
  }
}

export default new ApiController;