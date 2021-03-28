const id = require('./id');

module.exports = {
    type: "object",
    required: ["tipo", "vehiculoId"],
    properties: {
      tipo: {
        enum: ["entrada", "salida"] 
      },
      vehiculoId: {
        type: "integer",
        minimum: 0
      }
    },
    additionalProperties: false 
}

