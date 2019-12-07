const mongoose = require('mongoose');
const dotenv = require('dotenv');

//initialize dotenv
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log(
    `*****************************\n*    DB Connection: OK    *\n*****************************\n`
  );
});

mongoose.connection.on('error', () => {
  console.error.bind(
    console,
    '*    Error connecting to DB: \n****************************\n'
  );
});

mongoose.set('useCreateIndex', true);
