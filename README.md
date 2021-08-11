# Weather API

Weather API is a Node.js application that combines information from two different APIs, [Musement](https://api-docs.musement.com/) for cities and [WeatherApi](https://www.weatherapi.com/) for weather information, providing the weather information for each city where Musement has activities to sell.
The information can be obtained by calling an API route or by running a script from the command line interface (CLI).

## About The Project

The application could be run directly using package scripts or using Docker container

### Structure

The project root is under `/src` folder, the target for built application is `/dist` folder and obviously the folder `/test` is used to perform unit and integration tests.
On `/src` folder you can find the mail file `index.ts` and all others files of the application under the folder `app`.
The folders of the application are divided per role, routes, controllers, cli and lib.
The common libraries are under `lib` folder, the `cli` folder contains all script that could be executed outside the application directly in Command Line Interface (CLI).
Additional documentation could be placed on `/docs` folder.

```#ascii
project
│   README.md
│   LICENSE
│   CHANGELOG.md
│
├────src
│   │   index.ts
│   │
│   └─app
│       │   server.ts
│       │
│       ├─controllers
│       │   │   api.controller.ts
│       │
│       ├─routes  
│       │   │   index.ts
│       │   │   api.ts
│       │ 
│       ├─cli
│       │   │   forecast.ts
│       │   
│       └─lib
│           │   forecast.ts
│           │   musement.ts
│           │   weather.ts
│    
├─test
│   │   index.ts
│   
├────dist
│
└────docs
```

### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)

## Getting Started

You can run the project directly or better under docker container.

### Prerequisites

Obviously Node and npm installation is mandatory, the project use the LTS version 14.17.3 and npm version 7.20.1, check if Node is rightly installed, it could be useful use NVM to guarantee the use of the right version of Node and avoid issues dues to the use of a different version.

You have to provide an API Key for the Weather API, if you have no one you can register an account on [this page](https://www.weatherapi.com/signup.aspx) and get one.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/zauker/wheater-api.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Set Environment (standalone run)

   Before run the project you have to set the environment vars.
   The base URL of the APIs are without protocol, ideally you could use a different protocol (http/https), when the protocol is not specified https will be used.
   For weather API you have to set a key too.

   The API route could perform a call to a limit number of cities, or for a certain number of a forecast days, language could be setted too (so the name of cities and weather condition descriptions will be served in the required language).

   The values setted in env vars is used as default setting and used if any params are passed with the call.

   These value is used also to perform test, if necessary we could set a different environment set for test purpose.

   PORT is the port number of the express server

   ```.env
   MUSEMENT_API_BASE_URL=sandbox.musement.com/api/v3/
   WEATHER_API_BASE_URL=api.weatherapi.com/v1/
   WEATHER_API_AUTH_KEY=**your-key-here**

   DEFAULT_CITY_LIMIT=
   DEFAULT_FORECAST_DAYS=2
   DEFAULT_LANG=en

   PORT=3000
   ```

   There is a `.env.sample` that you can use.

4. Set Environment (docker run)

   For Docker run you have to set three .env file, on the project you can find three sample .env files that you easily copy and customize. To run the project you have only to provide a valid weather API key.

   The approach with .env is different the directly use of the app (without docker).

   Run app directly is a possibility but we suppose in next future could be mandatory (or simply easier) using only docker container.

   If we introduce in the project other services like Redis or MongoDB for example, run Docker will provide the entire development enviroiment with all needed services.

   `Dockerfile` and `docker-compose` configuration files use the file .env for customize docker configurations.

   For example in configuration we can find this setting

   ```yaml
    ports:
      - ${EXPOSE_PORT}:${PORT}
   ```

   EXPOSE_PORT (public port of container) and PORT (running port on container) are retrieved from .env file.

   We have two specific enviroinment docker-compose configuration both for dev and prod.

   All the enviroimnet setting for produtione are read from specific file `.env.prod` and the same is for development that use the file `.env.dev`.

   In this case we can set the dev and production enviroiment with properly values (sandbox api for dev for example).

   In this per enviroment files we expect the params MUSEMENT_API_BASE_URL, WEATHER_API_BASE_URL and WEATHER_API_AUTH_KEY to run calls to external APIs.

   DEFAULT_CITY_LIMIT, DEFAULT_FORECAST_DAYS, and DEFAULT_LANG are optional params, if provided they are assumed as default value on external APIs' calls.

   For example DEFAULT_FORECAST_DAYS is setted to 2, this means if a call to the app route '/forecast' without any additiona params provide forecast data for next two days.

   If this param is not setted the api perform a call and provide the number of forecast data provided by the external Weather API.

## Usage

### local run

You can run the application locally without using Docker. This is an overview of command setted in script section of package.json.

* __lint__ : run linter for code analysis
* __test__ : perform tests
* __coverage__ : perform tests and check the coverage of testing code
* __build__ : build the source typescript code to javascript
* __dev__ : run the application in development mode, the code in src folder are in watch and app restart when updates occurred.
* __start__ : run the built application

So you can start the application run the command:

```sh
npm run dev
```

or the following

```sh
npm run build
npm run start
```

### Docker run

For Docker we use docker-compose that set one container called `weather-api`.

We have to different setting for Dev and Prod environment.

Docker build use the `.env` variables for building the container, in this step only `PORT` and `EXPOSE_PORT` are used. The other environment variables are setted inside the container.
You could override the value of env vars setted in the container using specific .env files.

* __.env.dev__ : is used in development configuration
* __.env.prod__ : is used in production configuration

Build dev

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build 
```

Run dev

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Build prod

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build 
```

Run prod

```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

The Development container run the command `npm run dev` so the application start in watch mode. The Production container run the `npm run start` the container has not src and test folder and dev-dependencies installed.

## CLI reference

The CLI command return only a text/plain response in console log.

It doesn't handle argvs but it take the setted default value of limit, days and lang from ENV setting.

Run as develop mode (right from TS)

```sh
nodemon -r tsconfig-paths/register src/app/cli/forecast.ts
```

or

```sh
npx ts-node -r tsconfig-paths/register src/app/cli/forecast.ts
```

Run from built (using node)

```sh
node dist/app/cli/forecast.js
```

Override .env setting

```sh
DEFAULT_CITY_LIMIT=5 nodemon -r tsconfig-paths/register src/app/cli/forecast.ts
```

or

```sh
DEFAULT_CITY_LIMIT=5 node dist/app/cli/forecast.js
```

## API reference

### forecast

Method: __GET__

URL: __/api/forecast__

Full url example: __[http://localhost:3000/api/forecast](http://localhost:3000/api/forecast)__

Request Params

* limit
  * description: limit the number of cities retrieved
  * type: integer
  * default value: 0 (is setted via environment)
  * required: false

* days
  * description: number of day of forecast data
  * type: integer
  * default value: 2 (is setted via environment)
  * required: false

* lang
  * description: set the lang to localize data values
  * type: string
  * default value: en (is setted via environment)
  * required: false

#### Responses

* 200 Ok
  * application/json

    ```json
    {
      "city": "Rome",
      "forecast": [
        "Partly cloudy",
        "Moderate rain"
      ]
    }
    ```

  * text/plain

    ```text
    Processed city Amsterdam | Patchy rain possible, Patchy rain possible<br>\n
    Processed city Paris | Patchy rain possible, Patchy rain possible<br>\n
    Processed city Rome | Partly cloudy, Partly cloudy<br>\n
    ```

  * text/html

    ```text
    Processed city Amsterdam | Patchy rain possible, Patchy rain possible\n
    Processed city Paris | Patchy rain possible, Patchy rain possible\n
    Processed city Rome | Partly cloudy, Partly cloudy\n
    ```

* 503 Service Unavailable
  * text/html

    ```text
    Service Unavailable
    ```

## Roadmap

See the [open issues](https://github.com/zauker/wheater-api/issues) for a list of proposed features (and known issues).

Add params validator with Express Validator.

Add argvs handling in CLI script.

Localize also the statement `Processed city` on responses.

We should consider to introduce a Redis caching system to reduce the use of external API, it improves the performance and might be useful in case of API with a free tier quota or pay per use formula.

We should consider to introduce a mock server for testing external API, in this way test are faster and API doesn't consume the free tier quota for testing.

### New routes

We plan to build new routes to store and retrieve city/forecast data. All information and documentation about this task are under `docs/new-api` folder.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Michele Menciassi - m.menciassi@gmail.com

Project Link: [https://github.com/zauker/wheater-api](https://github.com/zauker/wheater-api)

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/michelemenciassi/
