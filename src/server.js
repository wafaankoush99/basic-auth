'use strict';

/**
 * Application SetUp
 */

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

/**
 * Importing
 */

const routes = require('./auth/router');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

/**
 * Middleware
 */

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

/**
 * Main Routes
 */

app.get('/', homePage);
app.use(routes);
app.use('*', notFoundHandler);
app.use(errorHandler);


/**
 * Functions
 */

/**
 * Home Page Route
 * @param {Object} req 
 * @param {Object} res
 * @returns {Object} welcome message 
 */

function homePage(req, res) {
  res.status(200).send('Welcome ♥');
}


/**
 * Exporting
 */

module.exports = {
  app: app,
  start: PORT => {
    app.listen(PORT, () => console.log(`Up To PORT ${PORT}`));
  },
};
