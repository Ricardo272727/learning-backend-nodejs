const knex = require('../db');
const moment = require('moment');
const pdf = require('html-pdf-node');
const { createPaymentTable } = require('../templates/payments');
const fs = require('fs');
const TABLE = 'events';
const _ = require('lodash');
const { event, logger, ServerError } = require('../errors');

async function getLastEventDate(vehiculoId, type = 'entrada'){
  try{
    let lastEvent = await knex(TABLE)
        .where({
          tipo: type,
          vehiculoId
        })
        .orderBy('fecha', 'desc')
        .limit(1)
        .select('fecha');
      lastEvent = _.get(lastEvent, '[0].fecha', null);
    return lastEvent;
  } catch(err){
    return null;
  }
}

function registerEntry({ vehiculoId }){
  const tipo = 'entrada';
  return new Promise(async (resolve, reject) => {
    try{
      let lastEntryDate = await getLastEventDate(vehiculoId, 'entrada');
      let lastExitDate = await getLastEventDate(vehiculoId, 'salida');
      lastEntryDate = moment(lastEntryDate);
      lastExitDate = moment(lastExitDate);
      let isOutsideVehicle = lastExitDate.diff(lastEntryDate) > 0;            
      if(!lastEntryDate.isValid() || isOutsideVehicle){
        knex(TABLE).insert({
          tipo,
          vehiculoId
        }).then(result => resolve({ id: result[0] }));
      } else {
        return reject(event.entry_already_exists);
      }           
    } catch(err){
      let error = new ServerError("Error registrando entrada");      
      logger.log('error', error.message);
      return reject(error);
    }
  });
}



function registerExit({ vehiculoId }){
  const tipo = 'salida';
  return new Promise(async (resolve, reject) => {
    try{
      let lastEntry = await getLastEventDate(vehiculoId, "entrada");
      let lastExit = await getLastEventDate(vehiculoId, "salida");      
      lastEntry = moment(lastEntry);
      lastExit = moment(lastExit);
      if(!lastEntry.isValid()){
        return reject(event.entry_not_exists);
      } 
      let exitAlreadyExists = false;
      if(lastExit.isValid()){
        exitAlreadyExists = lastEntry.diff(lastExit) < 0;            
      }
      if(!exitAlreadyExists){
        let minutos = moment().diff(lastEntry, 'minutes');
        knex(TABLE).insert({
          tipo,
          vehiculoId,
          minutos
        }).then(result => resolve({ id: result[0], minutos }));
      } else {
        return reject(event.exit_already_exists);
      }
    } catch(err){
      let error = new ServerError("Error registrando salida");
      logger.log('error', error.message);
      return reject(error);
    }
  });
}

function beginMonth(){
  return new Promise(async (resolve, reject) => {
    try {
      let result = await knex('events')
        .whereIn('vehiculoId', 
          knex
          .select('id')
          .from('vehicles')
          .where('tarifaId', 1)
        ).del();
      let residents = await knex('events')
        .whereIn('vehiculoId',
          knex
          .select('id')
          .from('vehicles')
          .whereNot('tarifaId', 1)
        ).orderBy('fecha', 'desc');
      let entries = residents.filter(r => r.tipo == 'entrada');
      let exits = residents.filter(r => r.tipo == 'salida');
      let lastEntries = [];
      for(let entry of entries){
        let index = lastEntries.findIndex(le => le.vehiculoId == entry.vehiculoId);
        if(index == -1){
          lastEntries.push(entry);
        }
      }
      let lastExits = [];
      for(let exit of exits){
        let index = lastExits.findIndex(le => le.vehiculoId == exit.vehiculoId);
        if(index == -1){
          lastExits.push(exit);
        }
      }
      let needResetStartTime = [];

      for(let entry of lastEntries){
        let lastEntry = _.get(entry, 'fecha', null);
        let lastExit = _.get(
          lastExits.find(le => le.vehiculoId == entry.vehiculoId), 
          'fecha', null
        );
        lastEntry = moment(lastEntry);
        lastExit = moment(lastExit);
        let isInParking = lastEntry.diff(lastExit) > 0;
        if(isInParking || !lastExit.isValid()){
          needResetStartTime.push(entry.id);    
        }
      }
      return knex('events')
        .whereIn('id', needResetStartTime)
        .update({ 
          fecha: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .then(items => {
          return resolve({
            officialsDeleted: result,
            residentsReseted: items
          });
        }).catch(err => {
          logger.log('error', event.error_reset_time.message);
          return reject(event.error_reset_time);
        });
    } catch(err){
      let error = new ServerError("Error desconocido (comienza mes)");
      logger.log('error', error.message);
      return reject(error);
    }
  });
}

function readPayments(){
  return new Promise((resolve, reject) => {
    // select a.minutos, a.vehiculoId, b.placa, t.nombre as tarifa, t.precioPorMinuto
    // from events a 
    //  join vehicles b on a.tipo = 'salida'
    //    and MONTH(a.fecha) = MONTH(NOW()) and a.vehiculoId = b.id
    //    join tarifa t on b.tarifaId = t.id;
    //
    knex('events')
      .join('vehicles', function(){
        this.on(knex.raw('MONTH(events.fecha)'), '=', knex.raw('MONTH(NOW())'))
          .on('events.tipo', '=', knex.raw('?', ['salida']))
          .on('events.vehiculoId', '=', 'vehicles.id')
          .on('vehicles.tarifaId', '=', knex.raw('?', [2]))
      })
      .join('tarifa', 'vehicles.tarifaId', '=', 'tarifa.id')
      .select(
        'tarifa.nombre as tarifa', 'events.minutos', 'vehicles.placa', 
        'events.vehiculoId as ID', 'tarifa.precioPorMinuto'
      )
      .then(payments => {
        let userPayments = [];
        payments.forEach(p => {
          let i = userPayments.findIndex(up => up.placa == p.placa);
          if(i == -1){
            userPayments.push(p);
          } else {
            userPayments[i].minutos += p.minutos;
          }          
        });
        userPayments = userPayments.map(up => {
          up.total = up.minutos * up.precioPorMinuto;
          return up;
        });
        createPdf(userPayments).then(result => {
          return resolve(result);
        }).catch(err => {
          let error = new ServerError("Error generando pdf");
          logger.log('error', error.message);
          return reject(error);
        });
      }).catch(err => {
        let error = new ServerError("Error generando archivo de pagos");
        logger.log('error', error.message);
        return reject(error);
      })
  });
}

function createPdf(payments){
  const paymentsTable = createPaymentTable(payments);
  const options = {
    format: "A4"
  };
  const file = {
    content: paymentsTable,
    name: 'payments.pdf'
  };
  return new Promise((resolve, reject) => {
    pdf
      .generatePdf(file, options)
      .then((pdfBuffer) => {
        return resolve(pdfBuffer);
      })
      .catch(err => {
        return reject(err);
      });
  });
}


module.exports = { registerEntry, registerExit, readPayments, beginMonth };



