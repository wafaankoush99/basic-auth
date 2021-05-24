'use strict';

/**
 * Application SetUp
 */

const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');

/**
 * Importing
 */

const basic_auth = require('./middleware/basic');
const Users = require('./models/users-model');

/**
 * Routes
 */

routes.post('/signup', signup);
routes.post('/signin', basic_auth, signin);

/**
 * Functions
 */

/**
 * Create UserName & Password
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object} 
 */
async function signup(req,res){
  try {

    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new Users({ username, password: hash });
    const record = await user.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send('Error : User is not created , please try again');
  }
}

/**
 * Give A Permission For The User To [ SignIn ]
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 */
async function signin(req, res) {
  res.status(200).json(req.user);
}

/**
 * Exporting
 */

module.exports = routes;
