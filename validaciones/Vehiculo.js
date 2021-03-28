module.exports = {

  create: {
    type: "object",
    required: ["placa", "tarifaId"],
    properties: {
      placa: {
        type: "string",
        length: 8    
      },
      tarifaId: {
        type: "integer",
        minimum: 0
      }
    },
    additionalProperties: false
  },
  update: {
    type: "object",
    properties: {
      placa: {
        type: "string",
        length: 8    
      },
      tarifaId: {
        type: "integer",
        minimum: 0
      }
    },
    anyOf: [
      { required: ["placa"] }, 
      { required: ["tarifaId"] }
    ],
    additionalProperties: false
  }
}
