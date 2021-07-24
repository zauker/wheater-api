import axios, { AxiosResponse } from 'axios';

export interface Country {
  id: number;
  name: string;
  iso_code: string;
}

export interface City {
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

export interface CityParams {
  offset?: number;
  limit?: number;
  prioritized_country?: number;
  prioritized_country_cities_limit?: number;
  sort_by?: string; // none | weight
  without_events?: string; // yes | no
}

export interface CityRequestParams {
  version?:string;
  lang?:string;
}

export interface MusementRequestParams {
  protocol?: string;
  format?: string;
}

export interface MusementServiceInterface {
  baseUrl: string;
  protocol: string;
  format: string;
  getCities(params?: CityParams, headers?:CityRequestParams):Promise<City[]>;
}

export default class MusementService implements MusementServiceInterface {
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
      const response: AxiosResponse<City[]> = await axios.get( url, { params: params, headers: requestHeaders });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}