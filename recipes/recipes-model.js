const db = require('../data/dbConfig.js');

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe
};

function getRecipes() {
  return db('recipes');
}

function getRecipe(id) {
  return db('recipes')
    .where({id}, 'id')
    .first();
}

function addRecipe(recipe) {
  return db('recipes')
    .insert(recipe)
    .then(([id]) => {
      return getRecipe(id);
    });
}
