# New API design

We plan to build other endpoints for Musement's API, one route for store data in DB and other to retrieve informations.

## Swagger definition

In this folder you can find a `new-api-definition.yml` that contain all informations about the new routes, for example, parameters, responses and so on.

You could use it with [Swagger online editor](https://editor.swagger.io/) or with other tools that support the swagger format.

## Postman

We use Postman to import the swagger definition of the new routes and generate the collection to use for testing pourpose and publish online documentation.

### Collection

You can easly import the file `new-api.postman_collection.json` to have the collection setted on your enviroment, the base URL in thi collection is `http://localhost:3000/api/v3`

### Online documentation

We publish, starting from swagger definition, the [online documentation](https://documenter.getpostman.com/view/591900/Tzz5sxef) under Postman free service.
