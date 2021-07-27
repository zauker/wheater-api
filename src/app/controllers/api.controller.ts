import {Request, Response} from 'express';
import MusementService from 'lib/musement';
import WeatherService from 'lib/weather';
import CityForecastUtil, { CityForecast, FormatterPlain } from 'lib/forecast';


class ApiController {
  public async forecast( req: Request, res: Response ):Promise<void> {
    const musementApiBaseUrl:string = process.env.MUSEMENT_API_BASE_URL || "";
    const weatherApiBaseUrl:string = process.env.WEATHER_API_BASE_URL || "";
    const weatherApiKey:string = process.env.WEATHER_API_AUTH_KEY || "";
  
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
      let cityForecastList: CityForecast[] = await CityForecastUtil.builder(ms, ws, {cityLimit: cityLimit, lang: lang, forecastDays: forecastDays});

      let cityForecastPlainList: string[];
      switch (req.headers['content-type']) {
        case 'text/plain':
          cityForecastPlainList = FormatterPlain.format(cityForecastList);
          res.setHeader('content-type', 'text/plain').send(cityForecastPlainList.join("\n"));
          break;
        case 'text/html':
          cityForecastPlainList = FormatterPlain.format(cityForecastList);
          res.setHeader('content-type', 'text/html').send(cityForecastPlainList.join("<br>\n"));
          break;    
        default:
          res.json(cityForecastList);
      }
    } catch (error) {
      res.status(503).send('Service Unavailable');
    }
    
  }
}

export default new ApiController;