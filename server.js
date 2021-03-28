const express = require('express');
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


const userSchema = {
  type: "object",
  required: ["first_name", "last_name", "role", "email"],
  properties: {
    first_name: {
      type: "string",
      minLength: 2,
    },
    last_name: {
      type: "string",
      minLength: 2,
    },
    age: {
      type: "integer",
      minimum: 18
    },
    role: {
      enum: ["ADMIN", "SUPER", "CLIENT"]
    },
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      pattern: "([A-Za-z\\d!@_?]|[A-Za-z\\d!@_?]|[A-Za-z\\d!@_?]){8,}",
      message: "Must contain one mayus, one number and one special char"
    },
    n_dogs: {
      type: "integer",
      minimum: 0
    },
    n_cats: {
      type: "integer",
      minimum: 0
    },
    about: {
      type: "string",
      minLength: 1
    },
    is_authorized: {
      type: "boolean"      
    },
    animal_ids: {
      type: "array",
      items: {
        type: "integer"
      },
      uniqueItems: true
    }
  }
};


const app = express();
app.use(express.json());

app.post(
  "/user",
  validate({ body: userSchema }),
  function createUserRouteHandler(request, response, next){
    console.log('process request')
    response.json(request.body);
    next();
  }
);

app.use(validationErrorMiddleware);

app.listen(4000, () => {
  console.log('localhost:4000')
})


