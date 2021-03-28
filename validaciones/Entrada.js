module.exports = {
  type: "object",
  required: ["fechaEntrada"],
  properties: {
    fechaEntrada: {
      type: "string"      
    },
    vehiculoId: {
      type: "integer",      
    }
  },
  additionalProperties: false
}
