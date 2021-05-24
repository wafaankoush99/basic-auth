'use strict';

/**
 * Application SetUp
 */

const mongoose = require('mongoose');

/**
 * Mongoose DB
 */

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Users = mongoose.model('users', usersSchema);

/**
 * Exporting
 */

module.exports = Users;
