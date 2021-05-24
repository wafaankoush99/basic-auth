'use strict';

/**
 * Application SetUp
 */

const base_64 = require('base-64');
const bcrypt = require('bcrypt');

/**
 * Importing
 */
const Users = require('../models/users-model');

/**
 * Function
 */

/**
 * Checking Sing In Process
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Object} 
 */



async function checkSignIn(req, res, next) {

  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base_64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  // const encoded = req.headers.authorization.split(' ');
  // const decoded = base_64.decode(encoded);
  // const [username, password] = decoded.split(':');

  try {
    const user = await Users.findOne({username});
    if(user){
      const isValid = await bcrypt.compare(password, user.password);
      if(isValid){
        req.user=user;
        next();
      }
      else {
        next(
          {
            message: 'Incorrect Password',
          },
        );
      }
    }
    else {
      res.status(403).send('Invalid UserName');
    }
  }
  catch(error) {
    res.status(403).send(`Error: Can Not Login`);
  }

}

/**
 * Exporting
 */

module.exports = checkSignIn;
