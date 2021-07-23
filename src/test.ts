import 'dotenv/config';
import axios, { AxiosResponse } from 'axios';

interface Country {
  id: number;
  name: string;
  iso_code: string;
}
interface City {
  id: number;
  uuid: string; // uuid Type?
  top: boolean;
  name: string;
  code: string;
  content: string;
  meta_description: string;
  more: string;
  weight: number;
  latitude: 48.866;
  longitude: 2.355;
  country: Country;
  cover_image_url: string; // URL Type?
  url: string; // URL Type?
  activities_count: number;
  time_zone: string;
  list_count: number;
  venue_count: number;
  show_in_popular: boolean;
}

interface CityParams {
  offset?: number;
  limit?: number;
  prioritized_country?: number;
  prioritized_country_cities_limit?: number;
  sort_by?: string; // none | weight
  without_events?: string; // yes | no
}

interface CityRequestParams {
  version?:string;
  lang?:string;
}

async function getCities(params?: CityParams, headers?:CityRequestParams):Promise<City[]> {
  try {
    let requestHeaders: any = {};
    if (headers && headers.version){
      requestHeaders['X-Musement-Version'] = headers.version;
    }
    if (headers && headers.lang){
      requestHeaders['Accept-Language'] = headers.lang;
    }
    const response: AxiosResponse<City[]> = await axios.get<City[]>('https://sandbox.musement.com/api/v3/cities', { params: params, headers: requestHeaders });
    // response.data.forEach( city => {
    //   console.log(`-> ${city.name} ${city.latitude},${city.longitude}`);
    // });
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

interface MusementRequestParams {
  protocol?: string;
  format?: string;
}

interface MusementServiceInterface {
  baseUrl: string;
  protocol: string;
  format: string;
  getCities(params?: CityParams, headers?:CityRequestParams):Promise<City[]>;
}

class MusementService implements MusementServiceInterface {
  baseUrl: string;
  protocol: string; // http | https
  format: string; // json | xml

  constructor(baseUrl: string, defaultParams?: MusementRequestParams){
    this.baseUrl = baseUrl; // base url for all API call
    this.protocol = defaultParams && defaultParams.protocol || 'https'; // default protocal used in API request
    this.format = defaultParams && defaultParams.format || 'json' // default format of response
  }

  public async getCities(params?: CityParams, headers?:CityRequestParams):Promise<City[]> {
    try {
      let requestHeaders: any = {};
      if (headers && headers.version){
        requestHeaders['X-Musement-Version'] = headers.version;
      }
      if (headers && headers.lang){
        requestHeaders['Accept-Language'] = headers.lang;
      }
      const url = `${this.protocol}://${this.baseUrl.replace(/\/?$/, '/')}cities.${this.format}`;
      const response: AxiosResponse<City[]> = await axios.get<City[]>( url, { params: params, headers: requestHeaders });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

interface WeatherRequestParams {
  key:string;
  protocol?: string;
  format?: string;
}

interface WeatherServiceInterface {
  baseUrl: string;
  key: string;
  protocol: string;
  format: string;
  forecast(params:ForecastParams):any;
}

interface ForecastParams {
  q: string;
  days?: number;
  aqi?: string;
  alerts?: string;
  lang?: string;
}

class WeatherService implements WeatherServiceInterface{
  baseUrl: string;
  key: string;
  protocol: string; // http | https
  format: string; // json | xml

  constructor(baseUrl: string, defaultParams: WeatherRequestParams){
    this.baseUrl = baseUrl; // base url for all API call
    this.key = defaultParams.key; // key for auth
    this.protocol = defaultParams.protocol || 'https'; // default protocal used in API request
    this.format = defaultParams.format || 'json' // default format of response
  }

  public async forecast(params: ForecastParams) {
    const url = `${this.protocol}://${this.baseUrl.replace(/\/?$/, '/')}forecast.${this.format}`;
    // let url = `${this.protocol}://${this.baseUrl}`; // set protocol and base url
    // url.replace(/\/?$/, '/'); // check if trailing slash is present
    // url += `forecast.${this.format}`; // add service andpoint with right format
    let getParams = Object.assign(params,{ key: this.key });
    try {
      const response: AxiosResponse = await axios.get(url, {params: getParams});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

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

