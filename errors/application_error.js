'use strict';
const ERROR_CODES = require('./codes');

class ApplicationError extends Error{
  constructor(message, status = 400, code = ERROR_CODES.APPLICATION){
    super(message);
    this.name = "ApplicationError"; 
    this.status = status;
    this.code = code;
  }
}

module.exports = ApplicationError;
