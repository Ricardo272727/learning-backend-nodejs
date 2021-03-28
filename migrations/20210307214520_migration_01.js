
exports.up = function(knex) {
  return knex.schema.createTable('tarifa', function(table){
    table.increments();
    table.string('nombre', 100);
    table.decimal('precioPorMinuto');
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('tarifa');  
};
