'use strict';

/**
 * Send An Error At Status (500)
 * @param {Object} req 
 * @param {Object} res 
 */

module.exports = (err, req, res, next) => {
    const error = err.message ? err.message : err;
    res.status(500);
    res.statusMessage = 'Server Error :(';
    res.json({ error });
};