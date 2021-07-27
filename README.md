# Weather API

Weather API is a Node.js application that combines information from two different APIs, [Musement](https://api-docs.musement.com/) for cities and [WeatherApi](https://www.weatherapi.com/) for weather information, providing the weather information for each city where Musement has activities to sell.
The information can be obtained by calling an API route or by running a script from the command line interface (CLI).

## About The Project

The application could be run directly using package scripts or using Docker container

### Structure

The project root is under `/src` folder and the target for built application is `/dist` folder.
The content of `/src` is divided under that criteria, `/app` contains the structure of the application that provide an Express server to serve the API.
The `/cli` folder contains all script that could be executed outside the application directly in Command Line Interface (CLI).
The common libraries are under `/lib` folder, and obviously the folder `/test` is used to perform unit and integration tests.  

```#ascii
project
│   README.md
│   LICENSE
│   CHANGELOG.md
│
├────src
│   │   index.ts
│   │
│   ├─app
│   │   │   server.ts
│   │   │
│   │   ├─controllers
│   │   │   │   api.controller.ts
│   │   │
│   │   ├─routes  
│   │      │   index.ts
│   │      │   api.ts
│   │ 
│   ├─cli
│   │   │   forecast.ts
│   │   
│   ├─lib
│   │   │   forecast.ts
│   │   │   musement.ts
│   │   │   weather.ts
│   │ 
│   └─test
│       │   index.ts
│   
└───dist
```

### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/zauker/wheater-api.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

## Roadmap

See the [open issues](https://github.com/zauker/wheater-api/issues) for a list of proposed features (and known issues).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Michele Menciassi - m.menciassi@gmail.com

Project Link: [https://github.com/zauker/wheater-api](https://github.com/zauker/wheater-api)

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/michelemenciassi/