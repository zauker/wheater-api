export default {
  type: "object",
  additionalProperties: false,
  properties: {
    id: {type: "integer"},
    uuid: {type: "string"},
    top: {type: "boolean"},
    name: {type: "string"},
    code: {type: "string"},
    content: {type: "string"},
    meta_description: {type: "string"},
    meta_title: {type: "string"},
    headline: {type: "string"},
    more: {type: "string"},
    weight: {type: "integer"},
    latitude: {type: "number"},
    longitude: {type: "number"},
    country: {
      id: {type: "integer"},
      name: {type: "string"},
      iso_code: {type: "string"} 
    },
    cover_image_url: {type: "string"},
    url: {type: "string"},
    activities_count: {type: "integer"},
    time_zone: {type: "string"},
    list_count: {type: "integer"},
    venue_count: {type: "integer"},
    show_in_popular: {type: "boolean"}
  }
};