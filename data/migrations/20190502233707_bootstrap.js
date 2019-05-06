exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('dishes', tbl => {
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique();
    })
    .createTable('recipes', tbl => {
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique();

      tbl
        .integer('FK_dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('ingredients', tbl => {
      tbl.increments();
      tbl
        .string('name', 128)
        .notNullable()
        .unique();
    })
    .createTable('recipes_ingredients', tbl => {
      tbl.increments();
      tbl
        .integer('FK_recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('FK_ingredient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ingredients')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl.float('ingredientsQuantity');
      tbl.varchar('instructions', 255);
    })
    .createTable('shoppingLists', tbl => {
      tbl.increments();
      tbl.string('name', 128);
      tbl
        .integer('FK_dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('FK_recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('FK_recipe_ingredient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes_ingredients')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dopTableIfExists('shoppingLists')
    .dopTableIfExists('recipes_ingredients')
    .dopTableIfExists('ingredients')
    .dopTableIfExists('recipes')
    .dopTableIfExists('dishes');
};
