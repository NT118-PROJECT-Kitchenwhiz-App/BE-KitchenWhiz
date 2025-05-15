const RecipesIngredientsModel = require("../models/recipes_ingredients_model");

class RecipesIngredientsService {
    static async createRecipesIngrident (data) {
        try {
            const {recipe_id, ingredient_id, amount, unit} = data;
            const newItem = new RecipesIngredientsModel({
                recipe_id,
                ingredient_id,
                amount,
                unit
            });

            return await newItem.save();
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = RecipesIngredientsService;