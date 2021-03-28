const knex = require('../db');
const model = require('../modelos/Evento');


function test(req, res){
  return model.readPayments()
    .then(result => {
      res.type('application/pdf');
      return res.end(result, 'binary')
    })
    .catch(err => res.send(err));
}

module.exports = test;
