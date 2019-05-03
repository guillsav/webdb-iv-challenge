const router = require('express').Router();
const db = require('../recipes/recipes-model.js');

router.post('/', async (req, res) => {
  try {
    if (
      req.body.name.length > 0 &&
      req.body.FK_dish_id &&
      req.body.name.length <= 128
    ) {
      const newRecipe = await db.addRecipe(req.body);
      res.status(201).json(newRecipe);
    } else if (!req.body.FK_dish_id) {
      res.status(400).json({errorMessage: 'Please provide recipe ID'});
    } else if (req.body.name.length > 128) {
      res
        .status(400)
        .json({errorMessage: 'Name cannot be more than 128 characters long.'});
    } else {
      res
        .status(400)
        .json({errorMessage: 'Please provide a name to add a recipe.'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error while adding the recipe to the database.'});
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await db.getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error while retrieving the recipes from the database.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundRecipe = await db.getRecipe(req.params.id);
    if (foundRecipe) {
      res.status(200).json(foundRecipe);
    } else {
      res.status(404).json({
        errorMessage: `Recipe with ID of ${req.params.id} cannot be found.`
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error while retrieving the recipe from the database.'
    });
  }
});

module.exports = router;
