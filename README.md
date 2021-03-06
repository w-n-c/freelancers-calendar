# Freelancer's Calendar
![all tests passing](https://img.shields.io/badge/tests-passing-brightgreen)
![statement coverage: 90%](https://img.shields.io/badge/coverage%3A_statements-90-brightgreen)
![branch coverage: 74%](https://img.shields.io/badge/coverage%3A_branches-74-yellowgreen)
![function coverage: 86%](https://img.shields.io/badge/coverage%3A_functions-84-green)
![line coverage: 90%](https://img.shields.io/badge/coverage%3A_lines-90-brightgreen)

A calendar designed to be as flexible as your schedule.<br>
See https://w-n-c.dev/ for a live deployment.

## Getting Started

Necessary software for development:
 - [Node.js](https://github.com/nodejs/node)
 - [Yarn](https://github.com/yarnpkg/yarn) (optional but highly recommended)

Then use yarn to install packages in root folder and in serv/

```console
yarn install && cd serv && yarn install && cd ..
```

Currently login and event CRUD operations require the following:
- [Google developer page](https://console.developers.google.com)
- MongoDB URI <br>
Launch a local server or use a free online server at https://www.mongodb.com/cloud/atlas

See [DEPLOYMENT.md](DEPLOYMENT.md) for details on account setup.

Add the keys to serv/config/dev.js ([example](serv/config/dev.example.js))

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode and launches the backend server.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) 
for more information.

### `yarn coverage`

Produces a coverage report and displays the results in the terminal.<br>

A web view of the coverage report will also be generated and can be found at<br> `/coverage/lcov-report/index.html`

### `yarn analyze`

Creates a web-view treemap to analyze memory usage of bundle.<br>
See [source-map-explorer](https://github.com/danvk/source-map-explorer) for more details.


### `yarn deploy`

Builds the app for production to the `build` folder and launches the back end server with [PM2](https://github.com/Unitech/pm2).<br>
See [DEPLOYMENT.md](DEPLOYMENT.md) and serv/package.json for required installs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
