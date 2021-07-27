import { MusementServiceInterface, CityParams, CityRequestParams, City } from 'lib/musement';
import { WeatherServiceInterface, ForecastParams, WeatherForecastResponse } from 'lib/weather';

export interface CityForecastBuilderParams {
  forecastDays?: number;
  cityLimit?: number;
  lang?: string;
}

export interface CityForecast {
  city: City;
  forecast: WeatherForecastResponse;
}

export class FormatterPlain {
  public static format (cityForecastList: CityForecast[]):Array<string> {
    return cityForecastList.map(cityForecast => {
      let conditions = cityForecast.forecast.forecast.forecastday.map( (fc:any) => fc.day.condition.text);
      return `Processed city ${cityForecast.city.name} | ` + conditions.join(', ');
    });
  }
}

export default class CityForecastUtil {

  public static async builder(ms: MusementServiceInterface, ws: WeatherServiceInterface, params?:CityForecastBuilderParams):Promise<CityForecast[]>{
    let cityParams: CityParams = {};
    if (params && params.cityLimit){
      cityParams.limit = params.cityLimit;
    }
    let cityRequestParams: CityRequestParams = {};
    if (params && params.lang){
      cityRequestParams.lang = params.lang;
    }
    let cities = await ms.getCities(cityParams, cityRequestParams);
    // define optional options for forecast request
    let forecastParams:ForecastParams = {q: ''};
    if (params && params.forecastDays){
      forecastParams.days = params.forecastDays;
    }
    if (params && params.lang){
      forecastParams.lang = params.lang;
    }
    // for each city we retrieve the weather conditions
    let elements = cities.map(async(city) => {
      // we get the weather condition of the city (by lat,lon)
      forecastParams.q = `${city.latitude},${city.longitude}`;
      let forecast: WeatherForecastResponse = await ws.forecast(forecastParams);
      
      return { city: city, forecast: forecast } as CityForecast;;
    });
  
    return await Promise.all(elements);
  }

}
