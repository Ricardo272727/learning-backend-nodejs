'use strict';
const ERROR_CODES = require('./codes');
const ApplicationError = require('./application_error');
const NotFoundError = require('./not_found_error');
const ServerError = require('./server_error');
const event = require('./instances/event');
const logger = require('./logger');


function getErrorResponse(error) {
    if(!error)
      error = new ServerError("Internal Server Error");
    let status = error.status;
    let err = { message: error.message, code: error.code };

    return { 
      error: err,
      status
    }
}

module.exports = { 
  ApplicationError, 
  NotFoundError, 
  ServerError, 
  ERROR_CODES, 
  getErrorResponse, 
  event,
  logger
};
