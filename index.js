'use strict';

/**
 * Application SetUp
 */

require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./src/server');

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(()=>{
    app.start(process.env.PORT || 3000);
  })
  .catch((err)=>console.log('Connection Error', err.message));