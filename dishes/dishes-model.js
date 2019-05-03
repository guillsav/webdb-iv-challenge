const db = require('../data/dbConfig.js');

module.exports = {
  getDishes,
  getDish,
  addDish
};

function getDishes() {
  return db('dishes');
}

function getDish(id) {
  return db('dishes')
    .where({id}, 'id')
    .first();
}

function addDish(dish) {
  return db('dishes')
    .insert(dish)
    .then(([id]) => {
      return getDish(id);
    });
}
