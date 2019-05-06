const router = require('express').Router();
const db = require('../dishes/dishes-model.js');

router.post('/', async (req, res) => {
  try {
    if (req.body.name.length > 0 && req.body.name.length <= 128) {
      const newDish = await db.addDish(req.body);
      res.status(201).json(newDish);
    } else if (req.body.name > 128) {
      res
        .status(400)
        .json({errorMessage: 'Name cannot be more than 128 characters long.'});
    } else {
      res.status(400).json({
        errorMessage: 'Please provide a name in order to create a new dish.'
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error while adding the dish to the database.'});
  }
});

router.get('/', async (req, res) => {
  try {
    const dishes = await db.getDishes();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error While retrieving the dishes from the database.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundDish = await db.getDish(req.params.id);
    if (foundDish) {
      res.status(200).json(foundDish);
    } else {
      res
        .status(404)
        .json({errorMessage: `Dish with ID ${req.params.id} not found.`});
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error  while retrieving the dish from the database.'
    });
  }
});

module.exports = router;
