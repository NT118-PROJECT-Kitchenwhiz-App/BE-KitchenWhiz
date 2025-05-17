const RecipesIngredientsModel = require("../models/recipes_ingredients_model");
const IngredientService = require("../services/ingredient_service");
const mongoose = require("mongoose");

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

    static async getRecipeIngredients (recipeId) {
        const recipeIngredients = await RecipesIngredientsModel.find({recipe_id: recipeId}).lean();
        
        if (recipeIngredients) {
            const ingredients = await Promise.all(
                recipeIngredients.map(async (recipeIngredient) => {
                    const ingredient = await IngredientService.getIngredient(recipeIngredient.ingredient_id);
                    return {
                        id: ingredient._id,
                        name: ingredient.name ?? "Không xác định",
                        amount: recipeIngredient.amount,
                        unit: recipeIngredient.unit
                    };
                })
            );
            return ingredients;
        }
        return null;
    }
}

module.exports = RecipesIngredientsService;