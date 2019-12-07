// Import our dependencies
const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors');
let appLive = '../../client/public';

module.exports = app => {
  const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
  };
  if (process.env.NODE_ENV !== 'development') {
    appLive = './public';
  }
  console.log('⚙️ Setup our express and nodejs application');
  app

    // gives server access to src folder where Vue.js application lives
    .use(express.static(path.join(__dirname, appLive)))
    // run cors
    .use(cors(corsOptions))

    // run bodyParser to parse form data
    .use(bodyParser.json())

    .use(bodyParser.urlencoded({ extended: true }));
};
