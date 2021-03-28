const knex = require('../db');

const TABLE = 'tarifa';

function create({ nombre, precioPorMinuto }){
  return new Promise((resolve, reject) => {
    knex(TABLE).insert({
      nombre,
      precioPorMinuto
    }).then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function update(id, props){
  return new Promise((resolve, reject) => {
    knex(TABLE).where({ id })
      .update(props).then(result => {
        resolve(result);
      }).catch(err => reject(err));
  });
}

function read(){
  return new Promise((resolve, reject) => {
    knex.select().table(TABLE).then(r => resolve(r))
      .catch(err => reject(err));
  });
}

function deleteById(id){
  return new Promise((resolve, reject) => {
    knex(TABLE).where('id', id).del()
      .then(r => resolve(r))
      .catch(err => reject(err));
  });
}

module.exports = { create, update, read, deleteById };


