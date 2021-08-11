import axios, { AxiosResponse } from 'axios';

export interface WeatherLocation {
  lat: number;
  lon: number;
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherCurrent {
  last_updated: string;
  last_updated_epoch: number;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  is_day: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface WeatherForecastDayElement {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  condition: WeatherCondition;
  uv: number;
}

export interface WeatherForecastAstroElement {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;  
}

export interface WeatherForecastHourElement {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  will_it_snow: number;
  is_day: number;
  vis_km: number;
  vis_miles: number;
  chance_of_rain: number;
  chance_of_snow: number;
  gust_mph: number;
  gust_kph: number;  
}

export interface WeatherForecastDay {
  date: string;
  date_epoch: number;
  day: WeatherForecastDayElement;
  astro: WeatherForecastAstroElement;
  hour: Array<WeatherForecastHourElement>;
}

export interface WeatherForecastResponse {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: {
    forecastday: Array<WeatherForecastDay>;
  }
}

export interface WeatherRequestParams {
  key:string;
  protocol?: string;
  format?: string;
}

export interface WeatherServiceInterface {
  baseUrl: string;
  key: string;
  protocol: string;
  format: string;
  forecast(params:ForecastParams):any;
}

export interface ForecastParams {
  q: string;
  days?: number;
  aqi?: string;
  alerts?: string;
  lang?: string;
}

export default class WeatherService implements WeatherServiceInterface{
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
    const getParams = Object.assign(params,{ key: this.key });
    try {
      const response: AxiosResponse<WeatherForecastResponse> = await axios.get(url, {params: getParams});
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}