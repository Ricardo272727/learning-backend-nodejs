const Router = require('express').Router();
const schema = require('../validaciones/Vehiculo');
const { validate } = require('../ajv');
const { create, update, read, deleteById } = require('../modelos/Vehiculo');
const { resultItems, deletedItems, error } = require('./responses');
const { getId } = require('./utils');

Router.route('/:id?')
  .get((req, res) => {
    return read().then(result => {
      return res.send(resultItems(result));
    }).catch(err => res.send(err));
  })
  .delete((req, res) => {
    let id = getId(req);
    if(!id) 
      return res.send(error('Id required or id > 0'));
    return deleteById(id).then(total => {
      return res.send(deletedItems(total));
    }).catch(err => res.send(err));
  })
  .put(validate({ body: schema.update }), (req, res) => {
    let id = getId(req);
    if(!id)
      return res.send(error('Id required or id > 0'));
    return update(id, req.body).then(result => {
      res.send({
        totalFound: result        
      });
    }).catch(err => res.send(err))
  })
  .post(validate({ body: schema.create }), (req, res) => {
    return create(req.body).then((ids) => {
      return res.send(resultItems([
        {
          id: ids[0],
          ...req.body
        }
      ]))
    }).catch(err => res.send(err));
  })

module.exports = Router;
