
exports.up = function(knex) {
  return knex.schema.createTable('events', function(table){
    table.increments();  
    table.timestamp('fecha').defaultTo(knex.fn.now());
    table.enu('tipo', ['entrada', 'salida']);
    table.integer('vehiculoId').unsigned();
    table.integer('minutos').unsigned();
    table.foreign('vehiculoId').references('vehicles.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('events');
};
