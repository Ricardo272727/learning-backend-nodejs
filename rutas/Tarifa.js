const router = require('express').Router();
const schema = require('../validaciones/Tarifa');
const { validate } = require('../ajv');
const { create, update, read, deleteById } = require('../modelos/Tarifa');
const { resultItems, deletedItems, error } = require('./responses');

router.route('/:id?')
  .get((req, res) => {
    return read().then(result => {
      return res.send(resultItems(result));
    }).catch(err => res.send(err));
  })
  .post(validate({ body: schema.create }), (req, res) => {
    return create(req.body).then((ids) => {      
      return res.send( 
        resultItems([
          {
            id: ids[0],
            ...req.body,
          }
        ]));
    }).catch(err => {
      return res.send(err);
    })
  })
  .put(validate({ body: schema.update }), (req, res) => {
    let id = parseInt(req.params.id);
    if(!id || id < 0){
      return res.send(error('Id required or id > 0'));
    }
    return update(id, req.body).then(result => {
      res.send({
        totalFound: result        
      });
    }).catch(err => res.send(err))
  })
  .delete((req, res) => {
    let id = parseInt(req.params.id);
    if(!id || id < 0){
      return res.send(error('Id required or id > 0'));
    }
    return deleteById(id).then(total => {
      return res.send(deletedItems(total));
    }).catch(err => res.send(err));    
  })

module.exports = router;
