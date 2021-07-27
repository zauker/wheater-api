export default {
  type: "object",
  additionalProperties: false,
  properties: {
    location: {
      lat: { type: "number" },
      lon: { type: "number" },
      name: { type: "string" },
      region: { type: "string" },
      country: { type: "string" },
      tz_id: { type: "string" },
      localtime_epoch: { type: "number" },
      localtime: { type: "string" }
    },
    current: {
      last_updated: { type: "string" },
      last_updated_epoch: { type: "number" },
      temp_c: { type: "number" },
      temp_f: { type: "number" },
      feelslike_c: { type: "number" },
      feelslike_f: { type: "number" },
      condition: {
        text: { type: "string" },
        icon: { type: "string" },
        code: { type: "number" }
      },
      wind_mph: { type: "number" },
      wind_kph: { type: "number" },
      wind_degree: { type: "number" },
      wind_dir: { type: "string" },
      pressure_mb: { type: "number" },
      pressure_in: { type: "number" },
      precip_mm: { type: "number" },
      precip_in: { type: "number" },
      humidity: { type: "number" },
      cloud: { type: "number" },
      is_day: { type: "number" },
      uv: { type: "number" },
      gust_mph: { type: "number" },
      gust_kph: { type: "number" }
    },
    forecast: {
      forecastday: [
        {
          date: { type: "string" },
          date_epoch: { type: "number" },
          day: {
            maxtemp_c: { type: "number" },
            maxtemp_f: { type: "number" },
            mintemp_c: { type: "number" },
            mintemp_f: { type: "number" },
            avgtemp_c: { type: "number" },
            avgtemp_f: { type: "number" },
            maxwind_mph: { type: "number" },
            maxwind_kph: { type: "number" },
            totalprecip_mm: { type: "number" },
            totalprecip_in: { type: "number" },
            avgvis_km: { type: "number" },
            avgvis_miles: { type: "number" },
            avghumidity: { type: "number" },
            condition: {
              text: { type: "string" },
              icon: { type: "string" },
              code: { type: "number" }
            },
            uv: { type: "number" }
          },
          astro: {
            sunrise: { type: "string" },
            sunset: { type: "string" },
            moonrise: { type: "string" },
            moonset: { type: "string" },
            moon_phase: { type: "string" },
            moon_illumination: { type: "number" }
          },
          hour: [
            {
              time_epoch: { type: "number" },
              time: { type: "string" },
              temp_c: { type: "number" },
              temp_f: { type: "number" },
              condition: {
                text: { type: "string" },
                icon: { type: "string" },
                code: { type: "number" }
              },
              wind_mph: { type: "number" },
              wind_kph: { type: "number" },
              wind_degree: { type: "number" },
              wind_dir: { type: "string" },
              pressure_mb: { type: "number" },
              pressure_in: { type: "number" },
              precip_mm: { type: "number" },
              precip_in: { type: "number" },
              humidity: { type: "number" },
              cloud: { type: "number" },
              feelslike_c: { type: "number" },
              feelslike_f: { type: "number" },
              windchill_c: { type: "number" },
              windchill_f: { type: "number" },
              heatindex_c: { type: "number" },
              heatindex_f: { type: "number" },
              dewpoint_c: { type: "number" },
              dewpoint_f: { type: "number" },
              will_it_rain: { type: "number" },
              will_it_snow: { type: "number" },
              is_day: { type: "number" },
              vis_km: { type: "number" },
              vis_miles: { type: "number" },
              chance_of_rain: { type: "number" },
              chance_of_snow: { type: "number" },
              gust_mph: { type: "number" },
              gust_kph: { type: "number" }
            }
          ]
        }
      ]
    }
  }
};