
exports.up = function(knex) {
  return knex.schema.createTable('vehicles', function(table){
    table.increments();
    table.string('placa');
    table.integer('tarifaId').unsigned().notNullable();
    table.foreign('tarifaId').references('tarifa.id');
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicles');  
};
