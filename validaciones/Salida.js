module.exports = {
  type: "object",
  required: ["fechaSalida", "vehiculoId"],
  properties: {
    fechaSalida: {
      type: "string"      
    },
    vehiculoId: {
      type: "integer",      
    }
  },
  additionalProperties: false
}
