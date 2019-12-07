const express = require('express');
const app = express();
const dotenv = require('dotenv');

//initialize dotenv
dotenv.config();

// App Config
require('./config/app')(app);

// Database Config
require('./config/db');

// Server-Side Routing Config
require('./config/routes')(app); // server routes go in this file

//Handle production
if (process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '/public/'));
  //handler spa
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

let port = process.env.PORT || 4000;
app.listen(port, () => {
  // Prints initialization
  console.log('******************************');
  console.log('*    Ap starting...');
  console.log('*    Ap run with ' + process.env.NODE_ENV);
  console.log('*    Il Kaizen Finances');
  console.log('*    By InternetLojas.com');
  console.log(`*    Port: ${port}`);
  console.log('*    Database: MongoDB');
  console.log('*    Token: jsonwebtoken');
  console.log('******************************\n');
});
