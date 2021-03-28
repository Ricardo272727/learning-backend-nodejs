const ERROR_CODES = require('../codes');
const ApplicationError = require('../application_error');
const ServerError = require('../server_error');

module.exports = {
  entry_already_exists: new ApplicationError(
    'El vehiculo se encuentra dentro del estacionamiento',
    400, ERROR_CODES.EVENT.ENTRY_ALREADY_EXISTS    
  ),
  exit_already_exists: new ApplicationError(
    'Ya se ha registrado la salida de este vehiculo',
    400, ERROR_CODES.EVENT.EXIT_ALREADY_EXISTS
  ),
  error_reset_time: new ServerError(
    'Error reiniciando tiempo de residentes'
  ),    
  entry_not_exists: new ApplicationError(
    'El vehiculo no se encuentra en el estacionamiento',
    400, ERROR_CODES.EVENT.ENTRY_NOT_FOUND
  )
}
