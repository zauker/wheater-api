import 'dotenv/config';
import MusementService, { MusementServiceInterface, CityParams, CityRequestParams } from 'lib/musement';
import WeatherService, { WeatherServiceInterface, ForecastParams } from 'lib/weather';

interface CityForecastBuilderParams {
  forecastDays?: number;
  cityLimit?: number;
  lang?: string;
}

class CityForecast {

  public static async builder(ms: MusementServiceInterface, ws: WeatherServiceInterface, params?:CityForecastBuilderParams):Promise<void>{
    let cityParams: CityParams = {};
    if (params && params.cityLimit){
      cityParams.limit = params.cityLimit;
    }
    let cityRequestParams: CityRequestParams = {};
    if (params && params.lang){
      cityRequestParams.lang = params.lang;
    }
    let cities = await ms.getCities(cityParams, cityRequestParams);
    // for each city we retrieve the weather conditions
    cities.forEach(async(city) => {
      // we get the weather condition of the city (by lat,lon)
      let forecastParams: ForecastParams = {q: `${city.latitude},${city.longitude}`};
      if (params && params.forecastDays){
        forecastParams.days = params.forecastDays;
      }
      if (params && params.lang){
        forecastParams.lang = params.lang;
      }
      let forecast:any = await ws.forecast(forecastParams);
      let conditions = forecast.forecast.forecastday.map( (fc:any) => fc.day.condition.text);
      console.log(`Processed city ${city.name} | ` + conditions.join(', '));
    });    
  }

}

async function init(){
  const musementApiBaseUrl:string = process.env.MUSEMENT_API_BASE_URL || "";
  const weatherApiBaseUrl:string = process.env.WEATHER_API_BASE_URL || "";
  const weatherApiKey:string = process.env.WEATHER_API_AUTH_KEY || "";

  // instance musement service
  const ms = new MusementService(musementApiBaseUrl);

  // instance the weather service
  const ws = new WeatherService(weatherApiBaseUrl, {key: weatherApiKey});
    
  CityForecast.builder(ms, ws, {cityLimit: 10, lang: 'it', forecastDays: 2});

};

init();

