'use strict';

/**
 * Send An Error At Status (404)
 * @param {Object} req 
 * @param {Object} res 
 */

module.exports = (req, res) => {
    res.status(404).json({
        error: 404,
        route: req.path,
        message: 'Not Found',
    });
};
