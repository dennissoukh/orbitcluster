# Orbitcluster

Orbitcluster is a web-based application for tracking and predicting passes for objects in orbit around the Earth.

This application was created as part of CT216: Software Engineering I at National University of Ireland, Galway.

## Installation
Orbitcluster uses [Yarn Package Manager](https://yarnpkg.com/) for package management and [MongoDB](https://www.mongodb.com/) for databases. It is assumed you already have the latest version of [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Clone this repository:
```bash
$ git clone https://github.com/dennissoukhikh/orbitcluster
```

Navigate into the `/core` folder and install the dependencies:
```bash
$ yarn install
```

## Usage
From the `/core` folder, serve the application:
```bash
$ yarn run watch
```
By default the application will run on `localhost:3000` or `127.0.0.1:3000`.

## License
[MIT](https://choosealicense.com/licenses/mit/)
