const router = require('express').Router();
const rutasTarifa = require('./Tarifa');
const rutasEvento = require('./Evento');
const rutasVehiculo = require('./vehiculos');
const { readPayments } = require('../modelos/Evento');
const { getErrorResponse } = require('../errors');
const test = require('./test');

router.use('/tarifa', rutasTarifa);
router.use('/vehiculo', rutasVehiculo);
router.use('/evento', rutasEvento);
router.get('/test', test)

router.get('/generarExcelPagos', (req, res) => {
 return readPayments()
  .then(result => {
    res.type('application/pdf');
    return res.end(result, 'binary');
  })
  .catch(err => {
    let { error, status } = getErrorResponse(err);
    return res.status(status).send(error);
  });
});



module.exports = router;
