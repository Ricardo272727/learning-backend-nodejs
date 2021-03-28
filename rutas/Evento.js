const router = require('express').Router();
const { validate } = require('../ajv');
const { registerEntry, registerExit, beginMonth } = require('../modelos/Evento');
const schema = require('../validaciones/Eventos');
const { resultItems } = require('./responses');
const { getErrorResponse } = require('../errors');

router.put('/registro', validate({ body: schema }), async (req, res) => {
  const { tipo, vehiculoId } = req.body;
  const registerEvent = tipo === 'entrada' ? registerEntry : registerExit;
  try{
    const result = await registerEvent({ vehiculoId });
    return res.status(200).send(
      resultItems([
        { ...result, ...req.body }
      ])
    );
  } catch(err) {
    let { status, error } = getErrorResponse(err);
    return res.status(status).send(error);
  }
});

router.post('/comienzaMes', (req, res) => {
  return beginMonth().then(result => {    
    return res.send(result);
  }).catch(err => {
    let { error, status } = getErrorResponse(err);
    return res.status(status).send(error);
  });
});

module.exports = router;
