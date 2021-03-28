
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del(); 
  await knex('vehicles').del();
  await knex('tarifa').del();

  return knex('tarifa').insert([
      {id: 1, nombre: 'oficial', precioPorMinuto: 0.5 },
      {id: 2, nombre: 'residente', precioPorMinuto: 1.0 },
    ]).then(function(){
      return knex('vehicles').insert([
        {id: 1, placa: 'OOO-33ES', tarifaId: 1},
        {id: 2, placa: 'EED-33ES', tarifaId: 2},
        {id: 3, placa: 'OOO-5E5S', tarifaId: 1},
      ]).then(function(){
        return knex('events').insert([
          {id: 1, tipo: 'entrada', vehiculoId: 2},
          {id: 2, tipo: 'entrada', vehiculoId: 3},
          {id: 3, tipo: 'entrada', vehiculoId: 1},
          {id: 4, tipo: 'salida', vehiculoId: 2, minutos: 10},
        ]);
      });
    });
};
