const ERROR_CODES = require('./codes');

class ServerError extends Error{
  constructor(message = "Ha ocurrido un error desconocido"){
    super(message);
    this.status = 500;    
    this.code = ERROR_CODES.SERVER;
  }
}

module.exports = ServerError;
