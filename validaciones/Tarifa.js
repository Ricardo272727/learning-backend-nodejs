const idSchema = require('./id');

module.exports = {

  create: {
    type: "object",
    required: ["precioPorMinuto", "nombre"],
    properties: {
      precioPorMinuto: {
        type: "number",
        min: 0
      },
      nombre: {
        type: "string",
        maxLength: 20,
        minLength: 1
      }
    },
    additionalProperties: false
  },
  update: {
    type: "object",    
    properties: {
      precioPorMinuto: {
        type: "number",
        min: 0
      },
      nombre: {
        type: "string",
        maxLength: 20,
        minLength: 1
      }
    },
    additionalProperties: false
  },
  deleteById: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "integer",
        min: 0
      }
    },
    additionalProperties: false
  }
}
