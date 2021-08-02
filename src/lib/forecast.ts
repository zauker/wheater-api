import { MusementServiceInterface, CityParams, CityRequestParams, City } from './musement';
import { WeatherServiceInterface, ForecastParams, WeatherForecastResponse } from './weather';

export interface CityForecastBuilderParams {
  forecastDays?: number;
  cityLimit?: number;
  lang?: string;
}

export interface CityForecast {
  city: City;
  forecast: WeatherForecastResponse;
}

export class FormatterTextList {
  public static format (cityForecastList: CityForecast[]):Array<string> {
    return cityForecastList.map(cityForecast => {
      const conditions = cityForecast.forecast.forecast.forecastday.map( (fc:any) => fc.day.condition.text);
      return `Processed city ${cityForecast.city.name} | ` + conditions.join(', ');
    });
  }
}

export class FormatterTextPlain {
  public static format (cityForecastList: CityForecast[]):string {
    return FormatterTextList.format(cityForecastList).join("\n");
  }
}

export class FormatterTextHtml {
  public static format (cityForecastList: CityForecast[]):string {
    return FormatterTextList.format(cityForecastList).join("<br>\n");
  }
}

export class FormatterJson {
  public static format (cityForecastList: CityForecast[]):string {
    const result = cityForecastList.map(cityForecast => {
      const element:any = { city: cityForecast.city.name, forecast: []};
      element.forecast = cityForecast.forecast.forecast.forecastday.map( (fc:any) => fc.day.condition.text );
      return element;
    });
    return JSON.stringify(result);
  }
}

export default class CityForecastUtil {

  public static async builder(ms: MusementServiceInterface, ws: WeatherServiceInterface, params?:CityForecastBuilderParams):Promise<CityForecast[]>{
    const cityParams: CityParams = {};
    if (params && params.cityLimit){
      cityParams.limit = params.cityLimit;
    }
    const cityRequestParams: CityRequestParams = {};
    if (params && params.lang){
      cityRequestParams.lang = params.lang;
    }
    const cities = await ms.getCities(cityParams, cityRequestParams);
    // define optional options for forecast request
    const forecastParams:ForecastParams = {q: ''};
    if (params && params.forecastDays){
      forecastParams.days = params.forecastDays;
    }
    if (params && params.lang){
      forecastParams.lang = params.lang;
    }
    // for each city we retrieve the weather conditions
    const elements = cities.map(async(city) => {
      // we get the weather condition of the city (by lat,lon)
      forecastParams.q = `${city.latitude},${city.longitude}`;
      const forecast: WeatherForecastResponse = await ws.forecast(forecastParams);
      
      return { city: city, forecast: forecast } as CityForecast;
    });
  
    return await Promise.all(elements);
  }

}
