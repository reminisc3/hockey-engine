# HockeyEngine

NHL style hockey simulation engine written in Angular and Material UI. Currently in the early stage of development, but some anticipated features include:

- Manage teams, players, coaches, stadiums
- Simulate games
- Franchise / GM mode

## Getting Started

### Building the app

1. Install latest version of [NodeJS](https://nodejs.org/)
2. Clone the repo to your machine
3. Run `npm install`
4. Run `npm build prod`

### Running the app

1. Run `ng serve --configuration production`

### Deploying the app

The entire app runs in the browser so there is no need for any advanced server configuration.

1. Run `npm build prod`
2. Copy contents of /public directory to server

## Serverless Database

This project uses IndexedDB as a NoSQL solution to store all application data. This means that you can "play" from anywhere using any supported browser. Currently, we are using [Dexie.JS](https://dexie.org/) which is an IndexedDB wrapper.

Eventually, there may be plans to add functionality to sync data to a database server.

## Credits

- [Dexie.JS](https://dexie.org/) for having an awesome IndexedDB wrapper
- dword4 for [documenting](https://gitlab.com/dword4/nhlapi) the NHL REST APIs:
