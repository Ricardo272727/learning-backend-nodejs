const {
  Validator,
  ValidationError
} = require('express-json-validator-middleware');

const { validate } = new Validator();

function validationErrorMiddleware(error, request, response, next) {
  if(response.headersSent){
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;

  if(!isValidationError){
    return next(error);
  }

  const errors = error.validationErrors.body;

  response.status(400).json(errors.map(err => {
    delete err.schemaPath;
    return err;
  })[0]);

  next();
}

module.exports = { 
  validate, 
  ajvMiddleware: validationErrorMiddleware 
};
